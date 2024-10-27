import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReviews,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductsById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReviews);

export default router;
