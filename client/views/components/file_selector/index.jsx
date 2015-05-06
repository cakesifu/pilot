var React = require("react"),
    models = require("./models"),
    File = models.File,
    FileLane = require("./file_lane"),
    FileList;

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
      currentPath: this._createFile(root),
    });
  },

  _createFile: function(root) {
    var file = new File(root);
    return file;
  },

  render: function() {
    var path = this.state.currentPath;

    if (!path) {
      return null;
    }

    return (
      <div className="file-selector">
        <div className="current-path">
          {path.path}
        </div>
        <div className="file-listing">
          <FileList file={path} onSelect={this.onFileSelect} />
        </div>
      </div>
    );
  },

  onFileSelect: function(index, file) {
    this.state.lanes.splice(index + 1, Number.MAX_VALUE, file);
    this.state.selected = file;
    this.forceUpdate();
  }
});

FileList = React.createClass({
  displayName: "components/file_list",

  propTypes: {
    entries: React.PropTypes.array,

    onSelect: React.PropTypes.func
  },

  componentWillMount: function() {
    this.props.file.on("change", this.onFileUpdate);
    // TODO only load data if not loaded or is directory and no children loaded
    this.props.file.loadData();
  },

  render: function() {
    return (
      <ul>
        {this.props.file.children.map(this.renderFile)}
      </ul>
    );
  },

  onFileUpdate: function() {
    this.forceUpdate();
  },

  renderFile: function(file) {
    return (
      <li>
        <a onClick={this.onFileSelect.bind(this, file)}>{file.filename}</a>
      </li>
    );
  },

  onFileSelect: function(file) {
    console.log(file);
  }


});
