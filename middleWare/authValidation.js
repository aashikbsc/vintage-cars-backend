const jwt = require("jsonwebtoken");
const config = require("../config/config")

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    jwt.verify(token, config.authorizationSecretkey, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status:false,
          message:"Access denied"
        })
        return
      }
      req.decoded = decoded
      return next();
    })
  } catch (err) {
    return res.status(401).send("Access denied");
  }
};

module.exports = verifyToken;