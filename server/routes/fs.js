var fs = require("fs"),
    path = require("path");

module.exports.readDir = function(req, res) {
  var target = req.query.path,
      targetFile;

  try {
    targetFile = new File(target);
  } catch(e) {
    handleError(e);
    return;
  }

  loadChildren(target, sendResults.bind(null, targetFile));

  function handleError(e) {
    res.status(500).json(e);
  }

  function sendResults(file, children) {
    res.status(200).json({
      file: file,
      children: children
    });
  }

  function loadChildren(filePath, done) {
    fs.readdir(filePath, function(err, entries) {
      var files;

      if (err) {
        done([]);
        return;
      }

      // TODO trim the results if too many array
      // TODO add pagiation support after trimming
      files = entries.map(function(fname) {
        return new File(path.join(target, fname));
      });

      done(files);
    });
  }

};

module.exports.makeDir = function(req, res) {

};

module.exports.rmDir = function(req, res) {

};

function File(filepath) {
  var stat = fs.statSync(filepath);

  this.path = filepath;
  this.isFile = stat.isFile();
  this.isDirectory = stat.isDirectory();
  this.size = 527;
}

