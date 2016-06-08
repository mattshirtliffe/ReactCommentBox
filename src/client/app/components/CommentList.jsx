var React = require('react');
var Comment = require('./Comment.jsx');

module.exports = React.createClass({
  render: function(){
      var comments  = this.props.data.map(function(comment){
        return (
            <Comment author={comment.author} key={comment._id}>
              {comment.text}
            </Comment>
        );
      });
      return (
        <div className="commentList">
          {comments}
        </div>
      );
  }
});
