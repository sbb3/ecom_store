const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    platform: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: ["name"],
      unique: true,
    },
    imagesUrls: {
      type: [String], // array of strings
      required: true,
    },
    buyLinks: [
      {
        link: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
