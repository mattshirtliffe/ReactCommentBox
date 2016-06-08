var React = require('react');
var ReactDOM = require('react-dom');
var Remarkable = require('remarkable');
var CommentBox = require('./components/CommentBox.jsx')


ReactDOM.render(

  <CommentBox url='/api/comments' pollInterval={2000}/>,
  document.getElementById('content')
);
