var React = require("react"),
    models = require("./models"),
    File = models.File;

module.exports = React.createClass({
  displayName: "components/file_selector/file_lane",

  propTypes: {
    file: React.PropTypes.object.isRequired,
    onlyFolders: React.PropTypes.bool,

    onSelect: React.PropTypes.func
  },

  componentWillMount: function() {
    this.props.file.on("change", this.onFileUpdate);
    // TODO only load data if not loaded or is directory and no children loaded
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
      <div className="lane">
        <h2>{file.path} {loading}</h2>
        <ul>
          {file.children.map(this.renderItem)}
        </ul>
      </div>
    );
  },

  renderItem: function(item, index) {
    if (this.props.onlyFolders && !item.isDirectory) {
      return null;
    }

    return (
      <li key={"file-" + item.filename}>
        <a onClick={this.onFileClick.bind(this, item)}>
          <i className="icon icon-file" />
          {item.filename} ({item.size})
        </a>
      </li>
    );
  },

  onFileClick: function(file) {
    if (this.props.onSelect) {
      this.props.onSelect(file);
    }
  }
});
