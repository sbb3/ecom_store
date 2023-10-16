require("module-alias/register");
require("dotenv").config();
const Product = require("../models/productModel");
const Description = require("../models/DescriptionSchema");
const { products } = require("../data/products");
const createSlugs = require("../utils/utils");
const connectDB = require("../db/conn");
const { faker } = require("@faker-js/faker");

function createDescriptions(products) {
  return products.map((product) => ({
    productId: product._id,
    description: faker.commerce.productDescription(),
    slug: product.slug,
  }));
}

const processItems = async (items) => {
  try {
    await Product.deleteMany({});
    // await Description.deleteMany({});
    console.log("Data destroyed successfully");

    // const createdProducts = await Product.create(products);
    // const descriptionsData = createDescriptions(createdProducts);
    // await Description.insertMany(descriptionsData);

	// await Product.insertMany(products);

	// console.log("Data imported successfully");


    process.exit();
  } catch (error) {
    console.error("Error processing items:", error);
    process.exit(1);
  }
};

connectDB();
processItems(products);
