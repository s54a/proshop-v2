import e from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @desc Create New Order
 * @route Post /api/orders
 * @access Private
 */

const addOrderItems = asyncHandler(async (req, res) => {
  try {
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("Order Items are required");
    }

    if (!req.user || !req.user._id) {
      res.status(401);
      throw new Error("User not authenticated");
    }

    const order = new Order({
      orderItems: req.body.orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error in addOrderItems:", error);
    res.status(500).json({
      error,
    });
    throw new Error(error);
  }
});

/**
 * @desc Get Logged in Users Orders
 * @route Get /api/orders/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getMyOrders:", error);
    res.status(500).json({
      error,
    });
    throw new Error(error);
  }
});

/**
 * @desc Get Order by ID
 * @route Get /api/orders/:id
 * @access Private
 */
const getOrdersById = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error in getOrdersById:", error);
    res.status(500).json({
      error,
    });
    throw new Error(error);
  }
});

/**
 * @desc Update Order to Paid
 * @route Put /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.send(500).json(error);
    throw new Error(error);
  }
});

/**
 * @desc Update Order to Delivered
 * @route Put /api/orders/:id/deliver
 * @access Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.send(500).json(error);
    throw new Error(error);
  }
});

/**
 * @desc Update Order to Delivered
 * @route Get /api/orders
 * @access Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    throw new Error(error);
  }
});

export {
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
