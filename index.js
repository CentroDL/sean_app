const routes = require("express")
const postgresql = require('connect-pgclient')
const morgan = require('morgan')

const accessDatabase = postgresql({
    config: {
      database: "sean_app_dev",
    },
    // transaction : true
  })

routes()
  .use(morgan('combined'))
  .get("/", accessDatabase, async (req, res) => {
    // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const sql = (sql) => {
      return new Promise((resolve) => {
        req.db.client.query(sql, (err, result) => {
          console.log("resolve: ", result.rows)
          resolve()
        })
      })
    }

    console.log("start")
    // await sleep(1000)
    // console.log("2")
    // await sleep(1000)
    // console.log("3")
    // let err, result = await sql("SELECT * FROM users")
    // console.log(sql("SELECT * FROM users"));
    await sql("SELECT * FROM users").then(function (err, result) {
      res.send(data.rows)
    })
    // req.db.client.query("SELECT * FROM users", (err, data) => {
    //   res.send(data.rows)
    // })
    console.log("done")
  })
  .listen(3000)