const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const otpSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180,
  },
});
otpSchema.pre('save', async function (next) {
  if (this.isModified('otp')) {
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
  }
  next();
});
otpSchema.methods.verifyOtp = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};
const otpModel = mongoose.model('otp', otpSchema);

module.exports = otpModel;