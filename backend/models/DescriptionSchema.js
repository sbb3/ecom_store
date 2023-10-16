const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    // features							: [
    //   {
    //     type: String,
    //   },
    // ],
    // platform: [
    //   {
    //     type: String,
    //     required: true,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Description = mongoose.model("Description", descriptionSchema);

module.exports = Description;
