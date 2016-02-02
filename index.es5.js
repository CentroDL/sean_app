$traceurRuntime.registerModule("index.js", [], function() {
  "use strict";
  var __moduleName = "index.js";
  var routes = require("express");
  var morgan = require('morgan');
  var pgp = require('pg-promise')();
  var cn = {
    host: 'localhost',
    port: 5432,
    database: 'sean_app_dev',
    user: 'jaden',
    password: null
  };
  var db = pgp(cn);
  routes().use(morgan('combined')).get("/", function(req, res) {
    var sleep = function() {
      var ms = arguments[0] !== (void 0) ? arguments[0] : 0;
      return new Promise(function(r) {
        return setTimeout(r, ms);
      });
    };
    console.log("start");
    db.tx($traceurRuntime.initGeneratorFunction(function $__1(t) {
      var $__2,
          $__3;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = 2;
              return t.none("INSERT INTO users (name) VALUES ('A')");
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              $ctx.state = 6;
              return sleep(1000);
            case 6:
              $ctx.maybeThrow();
              $ctx.state = 8;
              break;
            case 8:
              $ctx.state = 10;
              return t.many("SELECT * FROM users");
            case 10:
              $ctx.maybeThrow();
              $ctx.state = 12;
              break;
            case 12:
              $__2 = sleep(1000);
              $ctx.state = 18;
              break;
            case 18:
              $ctx.state = 14;
              return $__2;
            case 14:
              $__3 = $ctx.sent;
              $ctx.state = 16;
              break;
            case 16:
              $ctx.returnValue = $__3;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__1, this);
    })).then(function(result) {
      console.log(".then works: ", result);
      res.send(result);
    });
    console.log("done");
  }).listen(3000);
  return {};
});
$traceurRuntime.getModule("index.js" + '');
