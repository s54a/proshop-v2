import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @desc Create New Order
 * @route Post /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("add order items");
});

/**
 * @desc Get Logged in Users Orders
 * @route Get /api/orders/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("getMyOrders");
});

/**
 * @desc Get Order by ID
 * @route Get /api/orders/:id
 * @access Private
 */
const getMyOrdersById = asyncHandler(async (req, res) => {
  res.send("getMyOrdersById");
});

/**
 * @desc Update Order to Paid
 * @route Get /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("updateOrderToPaid");
});

/**
 * @desc Update Order to Delivered
 * @route Get /api/orders/:id/deliver
 * @access Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("updateOrderToDelivered");
});

/**
 * @desc Update Order to Delivered
 * @route Get /api/orders
 * @access Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  res.send("getAllOrders");
});

export {
  addOrderItems,
  getMyOrders,
  getMyOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
