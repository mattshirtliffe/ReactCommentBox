var React = require('react');
var ReactDOM = require('react-dom');
var Remarkable = require('remarkable');

var CommentBox = React.createClass({
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


var CommentList = React.createClass({
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


var CommentForm = React.createClass({
  getInitialState: function() {
    return {
      author: '',
      text: ''
    };
  },
  handleAuthorChange: function(event){
    this.setState({author:event.target.value});
  },
  handleTextChange: function(event){
    this.setState({text:event.target.value});
  },
  handleSubmit: function(event){
     event.preventDefault();
     var author = this.state.author.trim();
     var text = this.state.text.trim()

     if(!text || !author){
       return;
     }


     this.setState({
       author: '',
       text: ''
     });

     this.props.onCommentSubmit({
       author: author,
       text: text
     });
  },
  render: function(){
    return (
      <div className="commentForm">
        <form className="commenForm" onSubmit={this.handleSubmit}>
        <input
        type="text" placeholder="your name"
        value={this.state.author}
        onChange={this.handleAuthorChange}
        />


        <input
        type="text" placeholder="Say something please"
        value={this.state.text}
        onChange={this.handleTextChange}
        />



        <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});


var Comment = React.createClass({
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

// this guy must be a the bottom he instantiates and start the react bussiness
ReactDOM.render(

  <CommentBox url='/api/comments' pollInterval={2000}/>,
  document.getElementById('content')
);
