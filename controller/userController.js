var User = require("../model/userModel.js");
var Otp = require("../model/otpModel.js");
const { validationResult } = require('express-validator');
var commonUtils = require('../utils/commonUtils')

// This function is used to sign in a user account with an email and password.
exports.signIn = function (req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if(!user) {
      res.json({
        status:false,
        message:`We can't find an account with ${req.body.email}. Try another email address`,
      })
    } else if(user.comparePassword(req.body.password, (error,match) =>{
      if (!match) {
        res.json({
          status:false,
          message:"Password Incorrect",
          token:null,
        })
      } else{
        let token = commonUtils.generateToken({
          id: user._id,
          username: user.username,
          token:null,
        })
        res.json({
          status:true,
          message:"Successfully Login",
          token,
        })
      }
    }));
  })
}

// This function is used to sign up a user account.
exports.signUp = async function (req, res) {
  const registeredUser = await User.findOne({ number: req.body.number })
  if (registeredUser) {
    return res.status(400).json({
      status:false,
      message:"Number already existing!!!"
    })
  }
  let otpCode = commonUtils.generateOTP();
  var otp = new Otp({
    number: req.body.number,
    otp: otpCode,
  });
  otp.save().then((result) => {
    res.status(200).json({
      status:true,
      message:`Verification code is ${otpCode}`,
    })
  }).catch((error) => {
    res.status(400).json({
      status:false,
      message:"Something went wrong"
    })
  })
}

// This function is used to verify the one-time password and register user accounts.
exports.verifyOTP = async function (req, res) {
    const otpRecord = await Otp.findOne({ number: req.body.number }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return res.status(404).json({ status: false, message: 'OTP not found or expired' });
    }
    const isMatch = await otpRecord.verifyOtp(req.body.otp);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: 'Invalid OTP' });
    }
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      number: req.body.number,
      usertype: req.body.usertype,
      password:req.body.password,
    });
    user.save().then(async (result) => {
      await Otp.deleteMany({ number: req.body.number });
      let token = commonUtils.generateToken({
        id: result._id,
        username: result.username,
      })
      res.status(200).json({
        status:true,
        message:"Successfully Registered",
        token,
      })
    }).catch((error) => {
      res.status(400).json({
        status:false,
        message:"Something went wrong",
        token:null,
      })
    })
};