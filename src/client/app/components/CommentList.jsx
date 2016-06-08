var React = require('react');

module.exports = React.createClass({
  render: function(){
      var comments  = this.props.data.map(function(comment){
        return (
            <Comment author={comment.author} key={comment.id}>
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
