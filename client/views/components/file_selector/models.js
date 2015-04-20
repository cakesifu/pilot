var events = require("events"),
    util = require("util"),
    path = require("path"),
    api = require("../../../services/api");

function File(filepath) {
  this.loading = true;
  this.loaded = false;
  this.path = filepath;
  this.filename = path.basename(filepath);
  this.children = [];
}

util.inherits(File, events.EventEmitter);

File.prototype.loadData = function() {
  var self = this;
  api.path.info(this.path, this._onLoadData.bind(this));
};

File.prototype.setData = function(data, children) {
  children = children || [];
  this.loading = false;
  this.loaded = true;
  this.size = data.size;
  this.isDirectory = data.isDirectory;
  this.isFile = data.isFile;
  this.children = children.map(function(fileData) {
    var f = new File(fileData.path);
    f.setData(fileData);
    return f;
  });
  this.emit("change");
};

File.prototype._onLoadData = function(err, data) {
  this.loading = false;
  // TODO handle error
  this.setData(data.file, data.children);
};

module.exports.File = File;
