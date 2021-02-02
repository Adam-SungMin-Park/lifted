require('dotenv/config');
const db = require('./db');
const express = require('express');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/:table',(req,res)=>{
  const err = {"error":"something went wrong"};

  const sql = `
  select *
  from $1
  `
const params = [req.params.table]

  db.query(sql,params)
    .then(result => res.json(result.rows))
    .catch(err=> console.log(err))
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
