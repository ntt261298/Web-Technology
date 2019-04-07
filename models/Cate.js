const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CateSchema = new Schema({
  name: String
});

module.exports = Cate = mongoose.model('category', CateSchema);
