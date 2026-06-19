const Admin = require('../models/Admin');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getAdminContent = async (req, res, next) => {
  try {
    let content = await Admin.findOne({});
    if (!content) {
      content = await Admin.create({
        categories: [
          { name: 'Streetwear', color: '#ff3d71' },
          { name: 'Tech', color: '#00d4ff' },
          { name: 'Beauty', color: '#a3ff12' },
          { name: 'Sneakers', color: '#ffd60a' },
        ],
      });
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

const updateAdminContent = async (req, res, next) => {
  try {
    const content = await Admin.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json(content);
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const [users, products, orders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.find({}),
    ]);

    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
      return acc;
    }, {});

    res.json({ users, products, orders: orders.length, revenue, statusCounts });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminContent, updateAdminContent, getDashboardStats, getUsers };
