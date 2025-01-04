const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require("../config/config")
console.log("CONFIG DATA", config.authorizationSecretkey)

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