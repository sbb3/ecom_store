const jwt = require("jsonwebtoken");
const env = require("@/config/envalid");

const verifyJWTAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(403).json({ message: err.message });
  }
};

module.exports = verifyJWTAccessToken;
