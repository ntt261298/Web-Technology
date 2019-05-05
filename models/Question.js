const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  problem: {
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
  },
  code: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Question = mongoose.model('question', QuestionSchema);
