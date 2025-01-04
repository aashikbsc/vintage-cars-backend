const jwt = require("jsonwebtoken");

const config = require("../config/config")
console.log("CONFIG DATA", config.authorizationSecretkey)

const verifyToken = (req, res, next) => {
  console.log("inside auth",req.headers)
  // const token =
  // req.headers.authorization || req.headers["x-access-token"];
  // if (!token) {
  //   return res.status(403).send("A token is required for authentication");
  // }
  // try {
  //   jwt.verify(token, config.secret_key, (err, decoded) => {
  //     if (err) {
  //       return res.json({
  //         status: false,
  //         message: "Request failed.",
  //         errors: "Invalid Token"
  //       })
  //     } else {
  //       req.decoded = decoded
  //     }
  //   })
  // } catch (err) {
  //   return res.status(401).send("Invalid Token");
  // }
  // return next();
};

module.exports = verifyToken;