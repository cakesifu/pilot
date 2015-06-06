var events = require("events"),
    util = require("util"),
    path = require("path"),
    api = require("../../../services/api");

function Path(filepath) {
  this.loading = true;
  this.loaded = false;
  this.path = filepath;
  this.filename = path.basename(filepath);
  this.children = [];
}

util.inherits(Path, events.EventEmitter);

Path.prototype.loadData = function() {
  api.path.info(this.path, this._onLoadData.bind(this));
};

Path.prototype.setData = function(data, options) {
  options = options || {};
  this.loading = false;
  this.loaded = true;
  this.size = data.size;
  this.isDirectory = data.isDirectory;
  this.isFile = data.isFile;

  if (!options.silent) {
    this.emit("change");
  }
};

Path.prototype.setChildren = function(children, options) {
  var self = this;
  options = options || {};
  children = children || [];
  this.children = children.map(function(fileData) {
    var f = new Path(fileData.path);
    f.setData(fileData, {silent: true});
    f.setParent(self);
    return f;
  });

  if (!options.silent) {
    this.emit("change");
  }
};

Path.prototype.setParent = function(parent, options) {
  options = options || {};
  this.parent = parent;

  if (!options.silent) {
    this.emit("change");
  }
};

Path.prototype._onLoadData = function(err, data) {
  this.loading = false;
  // TODO handle error
  this.setData(data.file, {silent: true});
  this.setChildren(data.children, {silent: true});
  this.emit("change");
};

module.exports.Path = Path;
