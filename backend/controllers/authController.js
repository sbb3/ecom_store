const User = require("../models/userModel");
const generateJWTToken = require("../utils/secretToken");
const chalk = require("chalk");
const env = require("@/config/envalid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({ name, email, password });
    const accessToken = await generateJWTToken(
      newUser._id,
      env.JWT_ACCESS_TOKEN_SECRET,
      env.JWT_ACCESS_TOKEN_EXPIRES_IN
    );
    const refreshToken = await generateJWTToken(
      newUser._id,
      env.JWT_REFRESH_TOKEN_SECRET,
      env.JWT_REFRESH_TOKEN_EXPIRES_IN
    );
    res.cookie("refreshToken", refreshToken, {
      withCredentials: true, // this is the important part!, otherwise the cookie is not stored, and the browser will not send it back, even if you set the cookie,
      httpOnly: true,
      //   sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      console.log(chalk.red("Invalid credentials"));
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // const isMatch = await bcrypt.compare(password, user.password);

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log(chalk.yellow("Invalid credentials"));

      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = await generateJWTToken(
      user._id,
      env.JWT_ACCESS_TOKEN_SECRET,
      env.JWT_ACCESS_TOKEN_EXPIRES_IN
    );
    const refreshToken = await generateJWTToken(
      user._id,
      env.JWT_REFRESH_TOKEN_SECRET,
      env.JWT_REFRESH_TOKEN_EXPIRES_IN
    );
    res.cookie("refreshToken", refreshToken, {
      withCredentials: true,
      httpOnly: true,
      //   sameSite: "none", // this is the important part!, otherwise the cookie is not stored, and the browser will not send it back, even if you set the cookie,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNewAccessToken = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;
  //   console.log(chalk.red("refreshToken: "), refreshToken);
  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = await jwt.verify(
      refreshToken,
      env.JWT_REFRESH_TOKEN_SECRET
    ); // this will throw an error if the token is invalid or expired
    // console.log(chalk.green("decoded: "), decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = await generateJWTToken(
      user._id,
      env.JWT_ACCESS_TOKEN_SECRET,
      env.JWT_ACCESS_TOKEN_EXPIRES_IN
    );
    res.status(200).json({ message: "New access token", newAccessToken });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(403).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "No refresh token cookie provided" });
  }
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logout successful, cookie cleared" });
};

module.exports = { register, login, getNewAccessToken, logout };
