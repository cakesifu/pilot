var React = require("react"),
    models = require("./models"),
    File = models.File;

module.exports = React.createClass({
  displayName: "components/file_selector/file_lane",

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
