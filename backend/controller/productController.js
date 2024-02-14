import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @description Fetch all products
// @route GET /api/products
// @access Public
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @description Fetch a products
// @route GET /api/products/:id
// @access Public
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

export { getProduct, getProductByID };
