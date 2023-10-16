require("dotenv").config();
const jwt = require("jsonwebtoken");
const env = require("@/config/envalid");

const generateJWTToken = async (id, token, jwtExpireIn) => {
  return await jwt.sign({ id }, token, {
    expiresIn: jwtExpireIn,
  });
};

module.exports = generateJWTToken;
