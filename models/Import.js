const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImportSchema = new Schema({
  bookId: {
    type: String,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Import = mongoose.model('import', ImportSchema);
