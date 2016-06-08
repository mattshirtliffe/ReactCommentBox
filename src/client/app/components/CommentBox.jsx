var React = require('react');

var CommentList = require('./CommentList');
var CommentForm = require('./CommentForm');

module.exports = React.createClass({
  // self describing function set up all stuff in components ran once
  getInitialState: function(){
    return {data:[]};
  },
  loadCommentsFromServer: function() {
    return fetch(this.props.url, {
      method: 'get'
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      return json
    }).catch(function(ex) {
      console.log('parsing failed', ex)
  })
  },
  postComment: function(comment){

    var myHeaders = new Headers();
    myHeaders.set("Content-Type", "application/json");
    var myInit = { method: 'POST',
     headers: myHeaders,
     body:JSON.stringify(comment)
   };
    return fetch(this.props.url,myInit)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      return json
    }).catch(function(ex) {
      console.log('parsing failed', ex)
  })
  },
  handleCommentSubmit: function(comment){
    var comments = this.state.data;

   comment.id = Date.now();
   var newComments = comments.concat([comment]);
   this.setState({data: newComments});


    console.log(comment);
    this.postComment(comment)
    .then(function(json){
      this.setState({data:json});
    }.bind(this));

  },
  componentDidMount: function() {
    this.loadCommentsFromServer()
    .then(function(json){
      this.setState({data:json});
    }.bind(this));

    setInterval(this.loadCommentsFromServer, this.props.pollInterval);

  },
  // render is the tits this returns the tree of react structure
  render: function() {
    return (
      <div className="commentBox">
        <h1> Comments </h1>

          <CommentList  data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
