var React = require("react"),
    models = require("./models"),
    Path = models.Path,
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

  getInitialState: function() {
    return {
      currentPath: null
    };
  },


  componentWillMount: function() {
    this.reset(this.props.root);
  },

  reset: function(root) {
    this.setCurrentPath(new Path(root));
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
          <button>Use</button>
        </div>
        <div className="file-listing">
          <FileList entries={path.children} onSelect={this.onPathSelect} />
        </div>
      </div>
    );
  },

  onPathSelect: function(path) {
    this.setCurrentPath(path);
  },

  onPathChange: function() {
    this.forceUpdate();
  },

  setCurrentPath: function(path) {
    var crtPath = this.state.currentPath;
    if (crtPath) {
      crtPath.removeListener("change", this.onPathChange);
    }

    path.on("change", this.onPathChange);
    this.setState({
      currentPath: path
    });

    path.loadData();
  }

});

FileList = React.createClass({
  displayName: "components/file_list",

  propTypes: {
    entries: React.PropTypes.array,

    onSelect: React.PropTypes.func
  },

  render: function() {
    return (
      <ul>
        {this.props.entries.map(this.renderFile)}
      </ul>
    );
  },

  renderFile: function(file) {
    return (
      <li>
        <a onClick={this.onFileSelect.bind(this, file)}>{file.filename}</a>
      </li>
    );
  },

  onFileSelect: function(file) {
    if (this.props.onSelect) {
      this.props.onSelect(file);
    }
  }
});
