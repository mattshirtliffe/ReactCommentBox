var React = require('react');
var Remarkable = require('remarkable');

module.exports = React.createClass({
  renderMarkup: function() {
    var md = new Remarkable();
    var raw = md.render(this.props.children.toString());
    return {__html: raw}
  },
  render: function() {

    return (
      <div className="comment">
      <h2>
        {/*
          these are pass as params/properties in the jsx <components propname=value />
          */}
        {this.props.author}
      </h2>
       <span dangerouslySetInnerHTML={this.renderMarkup()} />
      </div>
    );
  }
});
