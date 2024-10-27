import fs from "fs";
import path from "path";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @desc Fetch All Products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc Fetch a Products by ID
 * @route GET /api/products/:id
 * @access Public
 */
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

/**
 * @desc Create a Product
 * @route POST /api/products
 * @access Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc Update a Product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(1500);
    console.log(error);
    throw new Error(error?.message);
  }
});

/**
 * @desc Delete a Product and its associated image
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Delete the image if it exists
    if (product.image) {
      const imagePath = product.image.startsWith("/")
        ? product.image.slice(1)
        : product.image;

      const fullPath = path.join(process.cwd(), imagePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({
        message: "Product and associated image deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error(error?.message || "Error deleting product");
  }
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
