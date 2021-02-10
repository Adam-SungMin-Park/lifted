require('dotenv/config');
const db = require('./db');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const jsonMiddleware = express.json();

const app = express();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/exercises', (req,res)=>{

  const sql = `
    select sum("exercises"."exerciseWeight"*"exercises"."exerciseReps") as "total_volume","exercises"."workOutId","userWorkOut"."createdAt","userWorkOut"."workOutPart"
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

app.get('/api/weight',(req, res)=>{
  const sql = `
    select "userWeight","createdAt"
    from "userWeight"
    order by "createdAt"
  `
  db.query(sql)
  .then(result=> {
    res.json(result.rows)
    console.log(result.rows)
  })
  .catch(err => console.log(err))

})

app.get('/api/foods',(req,res)=>{
  const sql = `
    select "userDailyMeal"."createdAt", sum("userCalories"."userFoodCalories")
    from "userDailyMeal"
    join "userCalories" using ("userMealId")
    group by "userDailyMeal"."createdAt"
    order by "userDailyMeal"."createdAt"
  `
  db.query(sql)
  .then(result =>{
    res.json(result.rows)
  })
  .catch(err=> console.log(err))
})


app.post('/api/foods',async (req,res)=>{

  const sql =`
    insert into "userDailyMeal" ("userId" , "createdAt")
    values ($1 , $2)
    returning "userMealId"
  `
  const params = [req.body.userId , req.body.createdAt]

  let mealId = await db.query(sql, params)
    .then(res => { return (res.rows[0].userMealId) })
    .catch(err => console.log(err))

  const caloriesParams = [mealId];
  let paramNum = 1;
  console.log(req.body.foods.length)
  const caloriesValues = req.body.foods.map((food) => {
    caloriesParams.push(food.food, food.calories)
    console.log(caloriesParams)
    return `($1, $${++paramNum},$${++paramNum})`
  })
  const caloriesSql = `
 insert into "userCalories" (  "userMealId", "userFoodName" , "userFoodCalories")
    values ${caloriesValues.join(', ')}
    returning *
`;

  db.query(caloriesSql, caloriesParams)
    .then(res => console.log(res.rows))
    .catch(err => console.log(err))





  /*for(var i = 0 ; i < req.body.foods.length ; i++){
  const sql2 =`
    insert into "userCalories" (  "userFoodName" , "userFoodCalories" , "userMealId")
    values ($1, $2, $3)
    returning *
  `
  const params2 = [req.body.foods[i].food , req.body.foods[i].calories , mealId]

   let testing = db.query(sql2, params2)
    .then(res => {return(res.rows[0])})
    .catch(err=> console.log(err))
  }*/
  res.status(207).json()
})

app.post('/api/weight',(req,res)=>{
  const sql = `
  insert into "userWeight" ("userId","userWeight","createdAt")
  values ($1, $2, $3)
  returning "createdAt"
  `
  const params = [req.body.userId, req.body.weight, req.body.date]

  db.query(sql,params)
  .then(res => console.log(res))
  .catch(err => console.log(err))

  res.status(205).json()
})

app.post('/api/exercises',async (req,res)=>{

  const sql = `
   insert into "userWorkOut" ("userId","workOutPart","createdAt")
   values ($1,$2,$3)
   returning "workOutId"
  `
  const params = [req.body.userId, req.body.workOutParts, req.body.workOutDate]

  let workoutId = await db.query(sql, params)
  .then(res => { return res.rows[0].workOutId })
  .catch(err => console.log(err))


  for (var i = 0 ; i < req.body.exercise.length; i++){
  const sql2 = `
    insert into "exercises" ("workOutId" , "exerciseName" , "exerciseWeight" , "exerciseReps")
    values ($1, $2, $3, $4)
    returning *
  `
  const params2 = [workoutId, req.body.exercise[i].exerciseName, req.body.exercise[i].weight, req.body.exercise[i].reps ]

 let testing =  db.query(sql2,params2)
  .then(res => {return(res.rows[0])})
  .catch(err => console.log(err))
}
res.status(203).json()
}
)

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
