var React = require('react');

module.exports = React.createClass({
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
