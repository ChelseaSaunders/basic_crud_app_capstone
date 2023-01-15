
const config = require('./config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const commentsRouter = require('./controllers/commentsRouter');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!!!!!")
  })
  .catch((error) => {
    console.log("error: could not connect to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use('/api/comments', commentsRouter);

module.exports = app;