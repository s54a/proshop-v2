import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @desc Create New Order
 * @route Post /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const dsf = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.itemsPrice,
    taxPrice: cart.taxPrice,
    shippingPrice: cart.shippingPrice,
    totalPrice: cart.totalPrice,
  };
  console.log(dsf);
  console.log(req.body);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Order Item is required");
  } else {
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
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
  // res.send("addOrderItems");
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
const getMyOrdersById = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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
