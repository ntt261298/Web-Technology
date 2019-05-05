const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AnswerSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  questionID: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Answer = mongoose.model('answer', AnswerSchema);
