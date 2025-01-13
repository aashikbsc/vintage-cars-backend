module.exports = {
  port: process.env.PORT || 3000,
  authorizationSecretkey: process.env.AUTHORIZATIONSECRETKEY || "secretkey",
  databaseUrl: process.env.DATABASEURL || "localhost:27017"
};