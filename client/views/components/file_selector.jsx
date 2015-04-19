var React = require("react"),
    events = require("events"),
    util = require("util"),
    api = require("../../services/api"),
    FileDisplay;

module.exports = React.createClass({
  displayName: "components/file_selector",

  propTypes: {
    root: React.PropTypes.string.isRequired,

    onSelect: React.PropTypes.func,
    onCancel: React.PropTypes.func
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.root != this.props.root) {
      this.reset(newProps.root);
    }
  },

  componentWillMount: function() {
    this.reset(this.props.root);
  },

  reset: function(root) {
    this.setState({
      files: [this._createFile(root)]
    });
  },

  _createFile: function(root) {
    var file = new File(root);
    return file;
  },

  render: function() {
    return (
      <div className="file-selector">
        {this.state.files.map(this.renderLevel)}
      </div>
    );
  },

  renderLevel: function(level, index) {
    return (
      <FileDisplay file={level} key={"file-" + index} />
    );
  }

});


FileDisplay = React.createClass({
  displayName: "components/file_selector.File",

  propTypes: {
    file: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func
  },

  componentWillMount: function() {
    this.props.file.on("change", this.onFileUpdate);
    this.props.file.loadData();
  },

  componentWillUnmount: function() {
    this.props.file.removeListener("change", this.onFileUpdate);
  },

  onFileUpdate: function() {
    this.forceUpdate();
  },

  render: function() {
    var file = this.props.file,
        loading = file.loading ? "loading" : null;

    return (
      <div className="level">
        <h2>{file.path} {loading}</h2>
        <ul>
          {file.children.map(this.renderItem)}
        </ul>
      </div>
    );
  },

  renderItem: function(item, index) {
    return (
      <li key={"file-" + index}>{item.path} ({item.size})</li>
    );
  }
});

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
