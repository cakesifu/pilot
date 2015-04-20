var React = require("react"),
    models = require("./models"),
    File = models.File,
    FileLane = require("./file_lane");

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
      lanes: [this._createFile(root)]
    });
  },

  _createFile: function(root) {
    var file = new File(root);
    return file;
  },

  render: function() {
    return (
      <div className="file-selector">
        selected: {this.state.selected && this.state.selected.path}
        {this.state.lanes.map(this.renderLane)}
      </div>
    );
  },

  renderLane: function(file, index) {
    var callback = this.onFileSelect.bind(this, index);
    return (
      <FileLane key={"file-" + file.path}
                file={file}
                onlyFolders={true}
                onSelect={callback} />
    );
  },

  onFileSelect: function(index, file) {
    this.state.lanes.splice(index + 1, Number.MAX_VALUE, file);
    this.state.selected = file;
    this.forceUpdate();
  }
});
