const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
  },
  answers: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
});

module.exports = Question = mongoose.model('question', QuestionSchema);
