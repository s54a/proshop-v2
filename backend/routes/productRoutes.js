import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { getProduct, getProductByID } from "../controller/productController.js";

router.route("/").get(getProduct);
router.route("/:id").get(getProductByID);

export default router;
