const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb://localhost:27017/music')
  .then(() => {
    console.log('Connected to Database')
  })
  .catch(() => {
    console.log('Connection Failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
      );
  next();
});



app.post("/songs", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post Added successfully'
  });
});

app.get('/songs', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Songs fetched succesfully',
      posts: documents
  });
  });
});

app.delete("/songs/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post Deleted'})
  });
});

module.exports = app;
