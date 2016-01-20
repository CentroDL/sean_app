let routes = require("express");
let postgresql = require('connect-pgclient');
let morgan = require('morgan');

let accessDatabase = postgresql({
    config: {
      database: "sean_app_dev",
    },
    transaction : true
  });

routes()
  .use(morgan('combined'))
  .get("/", accessDatabase, async (req, res) => {
    let sleep = (ms = 0) => {
      return new Promise(r => setTimeout(r, ms));
    };
    let sql = (sql) => {
      return new Promise((resolve, reject) => {
        req.db.client.query(sql, (err, result) => {
          if (err) { reject(err) }
          else { resolve(result) }
        });
      });
    };

    console.log("start");
    await sleep(1000);
    console.log("wake up");
    // sql("SELECT * FROM users").then(result => {
    //   console.log(".then works: ", result.rows);
    //   res.send(result.rows);
    // })
    // TODO: FOR SOME REASON THIS AWAIT DOESN'T WORK, EVEN THOUGH THE PROMISE
    //       ABOVE WORKS!
    result = await sql("SELECT * FROM users");
    console.log("await works");
    res.send(result.rows);
    console.log("done");
  })
  .listen(3000);