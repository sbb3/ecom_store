const { Router } = require("express");
const slugify = require("slugify");
const Product = require("@/models/ProductModel");
const Description = require("@/models/DescriptionSchema");

async function createProduct(req, res) {
  try {
    const { name, brand, price, platform, category, buyLinks, description } =
      req.body;
    // if (!name || !price || !platform || !category || !buyLinks) {
    //   return res.status(400).json({ message: "Please enter all fields" });
    // }

    const imagesUploadedPaths = req.files.map((file) => file.path);

    const newProduct = new Product({
      name,
      brand,
      price: Number(price),
      platform,
      category: category.toLowerCase(),
      slug: slugify(name, { lower: true }),
      imagesUrls: imagesUploadedPaths,
      buyLinks: JSON.parse(buyLinks),
      description,
    });
    const product = await newProduct.save(); // or await Product.create(req.body);

    return res.status(200).json({
      message: "Product created successfully!",
      product,
      uploadResult: req.files,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get product
async function getProductById(req, res) {
  try {
    const { id } = req.params;
    // const {id} = req.query;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get product by slug
async function getProductBySlug(req, res) {
  try {
    const { slug } = req.params;
    // console.log(req.params);
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// delete product by id
async function deleteProductById(req, res) {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// delete product by slug
async function deleteProductBySlug(req, res) {
  try {
    const { id: slug } = req.params;
    // console.log(req.params);
    const product = await Product.findOneAndDelete({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// update product
const updateProduct = async (req, res) => {
  try {
    const { id: slug } = req.params;
    const { name, price, image } = req.body;
    // console.log(req.body);
    if (!name || !price || !image) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    let slugifiedName = slugify(name, { lower: true });
    let priceNum = Number(price);
    const updateData = { name, priceNum, image, slug: slugifiedName };
    const product = await Product.findOneAndUpdate({ slug }, updateData, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get latest 12 products
async function getLatestProducts(req, res) {
  try {
    const { limit } = req.query;
    // console.log(limit);
    // console.log("getLatestProducts");
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    if (products.length === 0) {
      return res.status(404).json({ message: "Empty Product list" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// // get top selling products
// async function getTopSellingProducts(req, res)
// {
// }

// search products
async function searchProducts(req, res) {
  try {
    const { query, type } = req.query;
    // console.log("type ", type);
    let searchQuery = {};
    if (query) {
      searchQuery.name = { $regex: query, $options: "i" };
    }
    if (type) {
      searchQuery.type = { $regex: type, $options: "i" };
    }
    // const products = await Product.find({
    //   $and: [
    //     { name: { $regex: query, $options: "i" } },
    //     { type: { $regex: type, $options: "i" } },
    //   ],
    // });
    const products = await Product.find(searchQuery);
    if (products.length === 0) {
      return res.status(404).json({ message: "No product found" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// handle pagination
async function getProducts(req, res) {
  try {
    // console.log('page ', req.query);
    const LIMIT = 12;
    const { page, category } = req.query;
    let totalProducts = await Product.find(
      category ? { category: category } : {}
    ).countDocuments();
    const startIndex = (Number(page) - 1) * LIMIT;
    const products = await Product.find(category ? { category: category } : {})
      .limit(LIMIT)
      .skip(startIndex);

    if (products.length === 0) {
      return res.status(404).json({ message: "Empty Product list" });
    }
    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / LIMIT),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getSingleProduct(req, res) {
  try {
    // console.log(req.params);
    const { slug } = req.params;
    // console.log(slug);
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // console.log(product.imagesUrls[0]);
    // const description = await Description.findOne({ slug });
    // if (!description) {
    //   return res.status(404).json({ message: "Description not found" });
    // }
    // res.status(200).json({ product, description });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createProduct,
  getProductById,
  getProductBySlug,
  deleteProductById,
  getProducts,
  deleteProductBySlug,
  updateProduct,
  getLatestProducts,
  searchProducts,
  getSingleProduct,
};
