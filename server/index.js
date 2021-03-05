require('dotenv/config');
//const db = require('./db');

const express = require('express');
const staticMiddleware = require('./static-middleware');
const argon2  = require('argon2');
const jsonMiddleware = express.json();
const jwt = require('jsonwebtoken');
const app = express();
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(jsonMiddleware);

app.use(staticMiddleware);



app.get('/api/exercises', (req,res)=>{

  const sql = `
    select sum("exercises"."exerciseWeight"*"exercises"."exerciseReps") as "total_volume",
    "exercises"."workOutId",
    "userWorkOut"."createdAt",
    "userWorkOut"."workOutPart"
    from "exercises"
    join "userWorkOut" using ("workOutId")
    group by "exercises"."workOutId", "userWorkOut"."createdAt" ,"userWorkOut"."workOutPart"
    order by "createdAt"
  `

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => { return err })})




app.post('/api/workOutPart', (req, res) => {
  const sql = `
    select sum("exerciseWeight"*"exerciseReps") as "total_volume","createdAt"
    from "exercises"
    where "workOutPart" = $1
    group by "createdAt"
    order by "createdAt"
    limit 5
  `
  const params = [req.body.workOutPart]

  db.query(sql, params)
    .then(result => res.status(219).json(result.rows))
    .catch(err => { return err })})



app.post('/api/workout/reload', (req, res) => {
  const sql = `
    select "exerciseName", "exerciseWeight" , "exerciseReps" , "workOutPart" , "exercisesId"
    from "exercises"
    where "createdAt" =$1
  `
  const params = [req.body.createdAt];
  db.query(sql, params)
    .then(result => res.status(213).json(result.rows))
})




app.delete('/api/exercise/delete', (req, res) => {
  const sql = `
    delete from "exercises"
    where "exercisesId" =$1
  `
  const params = [req.body.exercisesId]

  db.query(sql, params)
    .then(result => res.status(240).json(result.rows))
    .catch(err => { return err })})


app.put('/api/exercise/update', (req, res) => {
  const sql = `
    update "exercises"
    set "exerciseName" =$1,
        "exerciseWeight" = $2,
        "exerciseReps" = $3
    where "exercisesId" = $4
  `
  const params = [req.body.exercise[0].exerciseName, req.body.exercise[0].exerciseWeight, req.body.exercise[0].exerciseReps, req.body.exercise[0].exercisesId]

  db.query(sql, params)
    .then(result => res.status(215).json(result.rows))
    .catch(err => { return err })})


app.post('/api/exercises', async (req, res) => {

  const sql = `
   insert into "userWorkOut" ("userId","workOutPart","createdAt")
   values ($1,$2,$3)
   returning "workOutId"
  `
  const params = [req.body.userId, req.body.workOutPart, req.body.createdAt]

  let workoutId = await db.query(sql, params)
    .then(res => { return res.rows[0].workOutId })
    .catch(err => { return err })


  const params2 = [workoutId, req.body.createdAt, req.body.workOutPart]
  let paramsNum = 3;
  let values = req.body.newExercise.map((exercise)=>{
      params2.push(exercise.exerciseName, exercise.exerciseWeight, exercise.exerciseReps)
      return `($1 , $2 , $3 , $${++paramsNum} , $${++paramsNum}, $${++paramsNum})`
      })



      const sql2 = `
      insert into "exercises" ("workOutId" , "createdAt", "workOutPart", "exerciseName" , "exerciseWeight" , "exerciseReps")
      values ${values.join(', ')}
      returning *
    `
      let testing = db.query(sql2, params2)
        .then(res => { return (res.rows[0]) })
        .catch(err => { return err })
    res.status(203).json()
})


app.get('/api/weight',(req, res)=>{
  const sql = `
    select "userWeight","createdAt"
    from "userWeight"
    order by "createdAt"
    limit 10
  `
  db.query(sql)
  .then(result=> {
    res.json(result.rows)

  })
    .catch(err => { return err })
})

app.get('/api/foods',(req,res)=>{
  const sql = `
   select "createdAt", sum("userFoodCalories")
   from "userCalories"
   group by "createdAt"
   order by "createdAt"
  `
  db.query(sql)
  .then(result =>{
    res.json(result.rows)
  })
    .catch(err => { return err })})


app.post('/api/signin',(req,res)=>{

  const sql = `
    select "userId","userPW"
    from "users"
    where "userEmail" = $1
  `
  const params =[req.body.email];

  const test = db.query(sql,params)
  .then(res => {
    if(res !==undefined){

    return argon2.verify(res.rows[0].userPW, req.body.password)
    }
    if(res === undefined ){
     return ""
    }
  })
  .then(isMatching =>{
    if(isMatching){
      const payloads = {
        userId:"",
          email: req.body.email
      }
      db.query(sql,params)
      .then(result => {
        payloads.userId = result.rows[0].userId
        const token = jwt.sign(payloads, process.env.TOKEN_SECRET);
        res.status(210).json(payloads)
      })
        .catch(err => { return err })
    }
    else{
      res.status(404).json("nice try :) again")
    }})
    .catch(err => { return err })
})



app.delete('/api/foods/delete',(req,res)=>{
  const sql =`
    delete from "userCalories"
    where "userCaloriesId" = $1
`
  const params = [req.body.calId]

  db.query(sql,params)
  .then(result => res.status(210).json(result.rows))
    .catch(err => { return err })
})



app.put('/api/foods/update',(req,res)=>{
  const sql= `
    update "userCalories"
    set "userFoodName" = $1 ,
        "userFoodCalories" = $2
    where "userCaloriesId" = $3
  `

  const params = [req.body.food , req.body.calories , req.body.calId]


  db.query(sql, params)
  .then(result=> res.status(211).json(result.rows))
    .catch(err => { return err })
  })


app.put('/api/weight/update',(req,res)=>{
  const sql =`
    update "userWeight"
    set "userWeight" = $1
    where "userWeightId" = $2
  `

  const params = [req.body.weight , req.body.weightId]

  db.query(sql,params)
  .then(result =>res.status(219).json(result.rows))
    .catch(err => { return err })
  })




app.post('/api/weight/reload',(req,res)=>{
  const sql = `
    select "userWeight" as "weight" , "userWeightId" as "weightId", "createdAt" as "date"
    from "userWeight"
    where "createdAt" =$1
  `
  const params = [ req.body.date]

  db.query(sql,params)
  .then(result => res.status(210).json(result.rows))
    .catch(err => { return err })
})


app.post('/api/foodsReload',(req,res)=>{

  const sql = `
   select "userFoodName" as "food" ,"userFoodCalories" as "calories" , "userCaloriesId" as "calId"
   from "userCalories"
   where "createdAt" = $1
   limit 10
  `
  const params = [req.body.createdAt]

  db.query(sql, params)
  .then(result => res.status(203).json(result.rows))
    .catch(err => { return err })})


app.post('/api/signup',(req,res)=>{

    const sql =`
      insert into "users" ("userEmail" , "userPW" )
      values ($1 , $2)
      returning "userId"
    `

    argon2.hash(req.body.password)
    .then(hashedPassword => {
      db.query (sql, [req.body.email,hashedPassword])})
      .then(result => {res.status(201).json(res.rows)
      })
      .catch(err => { return err })

})




app.post('/api/foods',async (req,res)=>{

  const sql =`
    insert into "userDailyMeal" ( "userId", "createdAt")
    values ($1 , $2 )
    returning "userMealId"
  `
  const params = [ req.body.userId ,req.body.createdAt]

  let mealId = await db.query(sql, params)
    .then(res => { return (res.rows[0].userMealId) })
    .catch(err => { return err })
  const caloriesParams = [mealId, req.body.createdAt];

  let paramNum = 2;

  const caloriesValues = req.body.newFoods.map((food) => {
    caloriesParams.push(food.food, food.calories)

    return `($1, $2, $${++paramNum},$${++paramNum})`
  })
  const caloriesSql = `
 insert into "userCalories" ("userMealId" , "createdAt" , "userFoodName" , "userFoodCalories")
    values ${caloriesValues.join(', ')}
    returning *
`;

  db.query(caloriesSql, caloriesParams)
    .then(res => {return(res.rows)})
    .catch(err => { return err })
      res.status(207).json()
})

app.post('/api/weight',(req,res)=>{
  const sql = `
  insert into "userWeight" ("userId","userWeight","createdAt")
  values ($1, $2, $3)
  returning "createdAt"
  `
  const params = [ req.body.userId, req.body.weight, req.body.date]

  db.query(sql,params)
  .then(res => {return(res)})
    .catch(err => { return err })
  res.status(205).json()
})


app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
});
