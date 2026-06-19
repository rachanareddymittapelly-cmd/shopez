const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: { type: String, required: true },
  mainImg: { type: String, required: true },
  size: { type: String, default: 'Standard' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      name: String,
      email: String,
      mobile: String,
      address: String,
      city: String,
      pincode: String,
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    paymentNote: { type: String, default: '' },
    totalAmount: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ['order placed', 'packed', 'shipped', 'delivered', 'cancelled'],
      default: 'order placed',
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
