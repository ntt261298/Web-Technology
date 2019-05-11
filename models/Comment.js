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
  answerID: {
      type: String,
      required: true
  },
  rating: {
      type: Number,
      default: 0
  }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);