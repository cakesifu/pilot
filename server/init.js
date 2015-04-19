var logger = require("../lib/logger"),
    express = require("express"),
    bodyParser = require("body-parser"),
    cookieSession = require("cookie-session"),
    loggerMiddleware = require("morgan"),

    routes = require("./routes");

module.exports = function(app, config) {

  app.set('config', config);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");

  // logging
  app.use(loggerMiddleware('dev'));
  app.set("logger", logger);

  // static assets
  app.use("/static", express.static(config.get("static.path")));

  // session management
  app.use(cookieSession({
    name: "session",
    keys: ["foo", "bar"], // TODO move these to config
  }));

  // body parsing middleware
  app.use(bodyParser.json({
  }));

  // initialize all the routes in the app
  //routes(app);
  app.use(routes(app));

};
