const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { user: req.user._id, items: [] });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, size = 'Standard', quantity = 1 } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $setOnInsert: { user: req.user._id } },
      { new: true, upsert: true }
    );

    const existing = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: product._id,
        title: product.title,
        mainImg: product.mainImg,
        price: product.price,
        discount: product.discount,
        size,
        quantity,
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      res.status(404);
      throw new Error('Cart item not found');
    }

    item.quantity = Math.max(1, Number(req.body.quantity || item.quantity));
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ user: req.user._id, items: [] });

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
