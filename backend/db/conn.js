const mongoose = require("mongoose");
require("dotenv").config();
const env = require("@/config/envalid");

const connectDB = async () => {
  try {
    // console.log(env.MONGO_URI);
    await mongoose.connect(env.MONGO_URI);
    // await mongoose.connection.dropCollection("products");
    console.log("Connected to MongoDB");
    // console.log("Collection dropped");
  } catch (err) {
    console.log("Error connecting to MongoDB");
    // console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
