import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @desc Create New Order
 * @route Post /api/orders
 * @access Private
 */

const addOrderItems = asyncHandler(async (req, res) => {
  try {
    // console.log("Received order data:", req.body);

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("Order Items are required");
    }

    // Log each field to check for undefined values
    // console.log("orderItems:", orderItems);
    // console.log("shippingAddress:", shippingAddress);
    // console.log("paymentMethod:", paymentMethod);
    // console.log("itemsPrice:", itemsPrice);
    // console.log("taxPrice:", taxPrice);
    // console.log("shippingPrice:", shippingPrice);
    // console.log("totalPrice:", totalPrice);

    if (!req.user || !req.user._id) {
      res.status(401);
      throw new Error("User not authenticated");
    }

    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // console.log("Created order object:", order);

    const createdOrder = await order.save();
    // console.log("Order saved successfully:", createdOrder);

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error in addOrderItems:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: error.stack,
    });
  }
});

/**
 * @desc Get Logged in Users Orders
 * @route Get /api/orders/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/**
 * @desc Get Order by ID
 * @route Get /api/orders/:id
 * @access Private
 */
const getOrdersById = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc Update Order to Paid
 * @route Put /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("updateOrderToPaid");
});

/**
 * @desc Update Order to Delivered
 * @route Put /api/orders/:id/deliver
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
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
