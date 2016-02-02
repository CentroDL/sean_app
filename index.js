let routes = require("express");
let morgan = require('morgan');
let pgp = require('pg-promise')();

var cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'sean_app_dev',
    user: 'jaden',
    password: null
};

var db = pgp(cn);

routes()
  .use(morgan('combined'))
  .get("/", (req, res) => {
    let sleep = (ms = 0) => {
      return new Promise(r => setTimeout(r, ms));
    };

    console.log("start");
    // await sleep(1000);
    // console.log("wake up");
    db.task(function * (t) {
        yield t.none("INSERT INTO users (name) VALUES ('A')");
        yield sleep(1000);
        yield t.many("SELECT * FROM users");
        return yield sleep(1000);
    })
    .then(result => {
      console.log(".then works: ", result);
      res.send(result);
    })
    // TODO: FOR SOME REASON THIS AWAIT DOESN'T WORK, EVEN THOUGH THE PROMISE
    //       ABOVE WORKS!
    // result = await sql("SELECT * FROM users");
    // console.log("await works");
    // res.send(result);
    console.log("done");
  })
  .listen(3000);