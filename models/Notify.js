const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotifySchema = new Schema({
  userID: String,
  status: {
      type: Boolean,
      default: false,
  },
  questionID: {
      type: String,
  }
});

module.exports = Notify = mongoose.model('notify', NotifySchema);
