const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    banner: {
      title: { type: String, default: 'ShopEZ Drop Zone' },
      subtitle: { type: String, default: 'Fresh finds, flash deals, zero checkout drama.' },
      image: { type: String, default: '' },
    },
    categories: [{ name: String, image: String, color: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
