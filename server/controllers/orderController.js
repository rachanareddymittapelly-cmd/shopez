const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getItemTotal = (item) => {
  const discountAmount = (item.price * item.discount) / 100;
  return (item.price - discountAmount) * item.quantity;
};

const createOrder = async (req, res, next) => {
  try {
    const { productId, size = 'Standard', quantity = 1, shippingAddress, paymentMethod, paymentNote } = req.body;
    let items = [];

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      items = [{
        product: product._id,
        title: product.title,
        mainImg: product.mainImg,
        size,
        quantity,
        price: product.price,
        discount: product.discount,
      }];
    } else {
      const cart = await Cart.findOne({ user: req.user._id });
      items = cart?.items || [];
    }

    if (!items.length) {
      res.status(400);
      throw new Error('No products selected for order');
    }

    const totalAmount = items.reduce((sum, item) => sum + getItemTotal(item), 0);
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      paymentNote,
      totalAmount,
    });

    if (!productId) {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not allowed to view this order');
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    order.orderStatus = req.body.orderStatus || order.orderStatus;
    if (order.orderStatus === 'delivered') order.deliveredAt = new Date();
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus };
