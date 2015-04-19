var request = require("superagent");

module.exports = {
  path: {
    info: function(path, callback) {
      request.get("/fs")
             .query({
               path: path
             }).end(function(err, res) {
               if (res.ok) {
                 callback(undefined, res.body);
               } else {
                 callback(res.body);
               }
             });

    }
  }
};
