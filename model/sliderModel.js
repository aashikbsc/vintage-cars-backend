const mongoose = require('mongoose');
const sliderSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const sliderModel = mongoose.model('slider', sliderSchema);

module.exports = sliderModel;