const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { getAdminContent, updateAdminContent, getDashboardStats, getUsers } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/content', getAdminContent);
router.use(protect, adminOnly);
router.put('/content', updateAdminContent);
router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
