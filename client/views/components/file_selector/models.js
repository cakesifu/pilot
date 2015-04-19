var events = require("events"),
    util = require("util"),
    api = require("../../../services/api");

function File(path) {
  this.loading = true;
  this.loaded = false;
  this.path = path;
  this.children = [];
}

util.inherits(File, events.EventEmitter);

File.prototype.loadData = function() {
  var self = this;
  api.path.info(this.path, this._onLoadData.bind(this));
};

File.prototype.setData = function(data) {
  var children = data.children || [];
  this.loading = false;
  this.loaded = true;
  this.size = data.size;
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
  this.setData(data);
};

module.exports.File = File;
