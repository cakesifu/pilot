/** @jsx React.DOM */

var
    fluxxor = require("fluxxor"),
    FileSelector = require("./components/file_selector"),
    React = require("react");

module.exports = React.createClass({
  displayName: "app",
  mixins: [
    fluxxor.FluxMixin(React)
  ],

  render: function() {
    return (
      <div>
        My app
        <div>
          <h2>File selector on <em>/root</em></h2>
          <FileSelector root="/root" />
        </div>
        <div>
          <h2>File selector on <em>/home/cezar</em></h2>
          <FileSelector root="/home/cezar" />
        </div>
      </div>
    );
  }
});
