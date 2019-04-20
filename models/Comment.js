const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  content: {
      type: String,
      required: true
  },
  questionID: {
      type: String,
      required: true
  },
  votes: {
      type: Number,
      default: 0
  }
});

module.exports = CommentSchema = mongoose.model('comment', CommentSchema);