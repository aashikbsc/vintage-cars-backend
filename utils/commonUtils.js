const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require("../config/config")
var User = require("../model/userModel.js");

// This function used to generate a random 6-digit OTP
exports.generateOTP = () => {
    return crypto.randomInt(100000, 999999);
};

// This function used to generate a JWT token
exports.generateToken = (params) => {
    return jwt.sign({
        userId:params.id,
        username:params.username,
        date: Date.now(),
    },config.authorizationSecretkey,{expiresIn: '48h'})
}

// This function is used to validate admin access.
exports.isAdmin = async(id) => {
    const user = await User.findOne({ _id: id });
    if (user && user.usertype === "admin") {
        return true;
    }
    return false;
};