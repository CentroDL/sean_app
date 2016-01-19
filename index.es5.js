$traceurRuntime.registerModule("index.js", [], function() {
  "use strict";
  var __moduleName = "index.js";
  var routes = require("express");
  var postgresql = require('connect-pgclient');
  var morgan = require('morgan');
  var accessDatabase = postgresql({config: {database: "sean_app_dev"}});
  routes().use(morgan('combined')).get("/", accessDatabase, function(req, res) {
    var sql,
        sleep;
    return $traceurRuntime.asyncWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            sql = function(sql) {
              return new Promise(function(resolve, reject) {
                req.db.client.query(sql, function(err, result) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result.rows);
                  }
                });
              });
            };
            sleep = function() {
              var ms = arguments[0] !== (void 0) ? arguments[0] : 0;
              return new Promise(function(r) {
                return setTimeout(r, ms);
              });
            };
            console.log("start");
            $ctx.state = 7;
            break;
          case 7:
            Promise.resolve(sleep(1000)).then($ctx.createCallback(2), $ctx.errback);
            return;
          case 2:
            console.log("2");
            $ctx.state = 9;
            break;
          case 9:
            Promise.resolve(sql("SELECT * FROM users")).then($ctx.createCallback(5), $ctx.errback);
            return;
          case 5:
            result = $ctx.value;
            $ctx.state = 4;
            break;
          case 4:
            res.send(data.rows);
            console.log("done");
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, this);
  }).listen(3000);
  return {};
});
$traceurRuntime.getModule("index.js" + '');
