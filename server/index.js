require('dotenv/config');
const db = require('./db');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const argon2  = require('argon2');
const jsonMiddleware = express.json();
const jwt = require('jsonwebtoken');
const app = express();


app.use(jsonMiddleware);

app.use(staticMiddleware);


/*
get request for the workout volume graphs.
*/
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
    .catch(err => console.log(err))
})


/*
query for the specific workout part
*/

app.post('/api/workOutPart', (req, res) => {
  const sql = `
    select sum("exerciseWeight"*"exerciseReps") as "total_volume","createdAt"
    from "exercises"
    where "workOutPart" = $1
    group by "createdAt"
    order by "createdAt"
  `
  const params = [req.body.workOutPart]

  db.query(sql, params)
    .then(result => res.status(219).json(result.rows))
    .catch(err => console.log("line 185 : " + err))
})

/*
bringing back the previous workout
*/

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


/*
delete request when user clicks on the "Remove Button"
*/

app.delete('/api/exercise/delete', (req, res) => {
  const sql = `
    delete from "exercises"
    where "exercisesId" =$1
  `
  const params = [req.body.exercisesId]

  db.query(sql, params)
    .then(result => res.status(240).json(result.rows))
    .catch(err => console.log(err))
})

/*
update request when user fixes the workout and click "Update"
*/

app.put('/api/exercise/update', (req, res) => {
  console.log("Update Happening : "+req.body.exercise[0].exerciseName )
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
    .catch(err => console.log("line 151 : " + err))
})

/*
posting new workout. Made Async. so i can use the return "WorkOut Id" from the first query.
*/
app.post('/api/exercises', async (req, res) => {

  const sql = `
   insert into "userWorkOut" ("userId","workOutPart","createdAt")
   values ($1,$2,$3)
   returning "workOutId"
  `
  const params = [req.body.userId, req.body.workOutPart, req.body.createdAt]

  let workoutId = await db.query(sql, params)
    .then(res => { return res.rows[0].workOutId })
    .catch(err => console.log(err))


  for (var i = 0; i < req.body.exercise.length; i++) {
    const sql2 = `
    insert into "exercises" ("workOutId" , "exerciseName" , "exerciseWeight" , "exerciseReps", "createdAt", "workOutPart")
    values ($1, $2, $3, $4, $5, $6)
    returning *
  `
    const params2 = [workoutId, req.body.exercise[i].exerciseName, req.body.exercise[i].exerciseWeight, req.body.exercise[i].exerciseReps, req.body.createdAt, req.body.workOutPart]

    let testing = db.query(sql2, params2)
      .then(res => { return (res.rows[0]) })
      .catch(err => console.log("line 311: " + err))
  }
  res.status(203).json()
})























app.get('/api/weight',(req, res)=>{
  const sql = `
    select "userWeight","createdAt"
    from "userWeight"
    order by "createdAt"
  `
  db.query(sql)
  .then(result=> {
    res.json(result.rows)

  })
  .catch(err => console.log(err))

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
  .catch(err=> console.log(err))
})


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
      console.log("login failed")
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
        console.log(payloads)
        const token = jwt.sign(payloads, process.env.TOKEN_SECRET);
        res.status(210).json(payloads)
      })
      .catch(err => console.log("login Failed"))

    }
    else{
      console.log("nice try :) again.")
      res.status(404).json("nice try :) again")
    }})
  .catch(err=>console.log("login failed"))

})



app.delete('/api/foods/delete',(req,res)=>{
  const sql =`
    delete from "userCalories"
    where "userCaloriesId" = $1
`
  const params = [req.body.calId]

  db.query(sql,params)
  .then(result => res.status(210).json(result.rows))
  .catch(err => console.log(err))

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
  .catch(err =>console.log("updating err : "+ err))
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
  .catch(err=> console.log("err reloading weight: "+err))

})


app.post('/api/foodsReload',(req,res)=>{

  const sql = `
   select "userFoodName" as "food" ,"userFoodCalories" as "calories" , "userCaloriesId" as "calId"
   from "userCalories"
   where "createdAt" = $1
  `
  const params = [req.body.createdAt]

  db.query(sql, params)
  .then(result => res.status(203).json(result.rows))
  .catch(err=>console.log("HERE IS THE ERRROR" +err))
})


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
      .catch(err=>console.log(err))


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
    .catch(err => console.log(err))

  const caloriesParams = [mealId, req.body.createdAt];

  let paramNum = 2;

  const caloriesValues = req.body.foods.map((food) => {
    caloriesParams.push(food.food, food.calories)

    return `($1, $2, $${++paramNum},$${++paramNum})`
  })
  const caloriesSql = `
 insert into "userCalories" ("userMealId" , "createdAt" , "userFoodName" , "userFoodCalories")
    values ${caloriesValues.join(', ')}
    returning *
`;

  db.query(caloriesSql, caloriesParams)
    .then(res => console.log(res.rows))
    .catch(err => console.log(err))
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
  .then(res => console.log(res))
  .catch(err => console.log("line 312 : "+err))

  res.status(205).json()
})


app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
