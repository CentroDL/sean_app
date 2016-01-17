$traceurRuntime.registerModule("index.js", [], function() {
  "use strict";
  var __moduleName = "index.js";
  var routes = require("express");
  var postgresql = require('connect-pgclient');
  var morgan = require('morgan');
  var accessDatabase = postgresql({
    config: {database: "sean_app_dev"},
    transaction: true
  });
  routes().use(morgan('combined')).get("/", function(req, res) {
    var sleep,
        sql,
        result;
    return $traceurRuntime.asyncWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            sleep = function(ms) {
              return new Promise(function(resolve) {
                return setTimeout(resolve, ms);
              });
            };
            sql = function(sql) {
              return new Promise(function(resolve) {
                return req.db.client.query(sql, resolve);
              });
            };
            console.log("1");
            $ctx.state = 9;
            break;
          case 9:
            Promise.resolve(sleep(1000)).then($ctx.createCallback(2), $ctx.errback);
            return;
          case 2:
            console.log("2");
            $ctx.state = 11;
            break;
          case 11:
            Promise.resolve(sleep(1000)).then($ctx.createCallback(4), $ctx.errback);
            return;
          case 4:
            console.log("3");
            $ctx.state = 13;
            break;
          case 13:
            Promise.resolve(sql("SELECT * FROM users")).then($ctx.createCallback(7), $ctx.errback);
            return;
          case 7:
            result = $ctx.value;
            $ctx.state = 6;
            break;
          case 6:
            console.log("4");
            console.log("done");
            res.send("Hey!");
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
