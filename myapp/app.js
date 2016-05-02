var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected!");
});
db.on("error", function(err){
  console.log("DB ERROR :", err);
});

// model setting
var postSchema = mongoose.Schema({
  title: {type:String, required:true},
  body: {type:String, required:true},
  createdAT: {type:Data, default:Date.now},
  updatedAT: date
});
var Post = mongoose.model('Post', postSchema);

// view setting

app.set("view engine", 'ejs');

// set middlewares
app.use(express.static(path.join(__dirname, 'public' )));
app.use(bodyParser.json());

// set routes
app.get('/posts', function(req, res){
  Post.find({} , function(err,posts){
    if(err) return res.json({success:false, message:err});
    res.json({sucess:true, data:posts});
  });
}); //index
app.post('/posts', function(req, res){
  Post.create(req.body.post, function(err,post){
    if(err) return res.json({succes:false, message:err});
    res.json({success:true, data:post});
  });
}); // create
//start server


app.listen(3003, function(){
  console.log('3003 port server on!');
});
