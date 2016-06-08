
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'src/client/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://172.17.0.2/comment");

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    bought: {type: Boolean, default: false},
});

var Item = mongoose.model('Item', ItemSchema);


var CommentSchema = new Schema({
    author: {type: String, required: true},
    text: {type: String}
});

var Comment = mongoose.model('Comment', CommentSchema);

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {

  Comment.find(function(err, item){
      if(err){
        console.log(err);
      }
      else{
        res.json(item);
      }
  });
});


app.post('/api/comments', function(req, res) {


  Comment.create({author: req.body.author, text: req.body.text}, function(err, comment){
      if(err){
        console.log(err);
      }
      else{
        console.log(comment);
      }
  });

  Comment.find(function(err, item){
      if(err){
        console.log(err);
      }
      else{
        res.json(item);
      }
  });

});



app.post('/api/items', function(req, res) {

  Item.create({title: req.body.title, description: req.body.description, bought: req.body.bought}, function(err, item){
      if(err){
        console.log(err);
      }
      else{
        res.json(item);
      }
  });
});

app.get('/api/items', function(req, res) {

  Item.find(function(err, item){
      if(err){
        console.log(err);
      }
      else{
        res.json(item);
      }
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
