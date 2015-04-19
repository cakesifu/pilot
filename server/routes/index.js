var
    express = require("express"),
    session = require("./session"),
    fs = require("./fs"),
    home = require("./home"),
    debug = require("./debug");

module.exports = function(app) {
  var router = express.Router();

  router.use("/debug", debug(app));

  router.get("/", home.homepage);
  router.get("/session", session.read);

  router.get("/fs", fs.readDir);
  router.put("/fs", fs.makeDir);
  router.delete("/fs", fs.rmDir);

  return router;
};
