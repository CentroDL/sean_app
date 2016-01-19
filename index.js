let routes = require("express");
let postgresql = require('connect-pgclient');
let morgan = require('morgan');

let accessDatabase = postgresql({
    config: {
      database: "sean_app_dev",
    },
    // transaction : true
  });

routes()
  .use(morgan('combined'))
  .get("/", accessDatabase, async (req, res) => {
    // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    let sql = (sql) => {
      return new Promise((resolve, reject) => {
        req.db.client.query(sql, (err, result) => {
          if (err) { reject(err) } else { resolve(result.rows) }
        });
      });
    };
    let sleep = (ms = 0) => {
      return new Promise(r => setTimeout(r, ms));
    };

    console.log("start");
    await sleep(1000);
    console.log("2");
    result = await sql("SELECT * FROM users");
    res.send(data.rows);
    // req.db.client.query("SELECT * FROM users", (err, data) => {
    //   res.send(data.rows)
    // })
    console.log("done");
  })
  .listen(3000);