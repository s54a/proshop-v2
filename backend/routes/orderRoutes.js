import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getMyOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, isAdmin, getMyOrdersById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivered").put(protect, isAdmin, updateOrderToDelivered);

export default router;