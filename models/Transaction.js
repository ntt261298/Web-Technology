const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
  usernameID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'In Processing'
  },
  cart: {
    type: Array,
    required: true
  }
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
