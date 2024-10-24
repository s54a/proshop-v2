import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  createProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/:id").get(getProductsById);

export default router;
