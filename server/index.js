require('dotenv/config');
const db = require('./db');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const jsonMiddleware = express.json();

const app = express();


app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/exercises',(req,res)=>{
  res.json(exerciseExample)
})

/*app.post('/api/workout',(req,res)=>{
  const sql = `
  insert into "userWorkOut"("userId","workOutPart")
  values = ($1,$2)
  `

  const params = [req.body.userId , req.body.workOutPart]

  db.query(sql,params)
  .then(res => console.log(res))
  .cath
})*/

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
  //console.log("test: "+ workoutId);

for (var i = 0 ; i < req.body.exercise.length; i++){

  const sql2 = `
    insert into "exercises" ("workOutId" , "exerciseName" , "exerciseWeight" , "exerciseReps")
    values ($1, $2, $3, $4)
    returning *
  `
  const params2 = [workoutId, req.body.exercise[i].exerciseName, req.body.exercise[i].weight, req.body.exercise[i].reps ]

  db.query(sql2,params2)
  .then(res => console.log(res.rows[0]))
  .catch(err => console.log(err))
}
}
)

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
