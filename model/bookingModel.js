const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  eventdate: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  carname: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isread: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const bookingModel = mongoose.model('booking', bookingSchema);

module.exports = bookingModel;