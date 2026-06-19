const Product = require('../models/Product');
const products = require('../data/products');

const ensureProducts = async () => {
  for (const product of products) {
    await Product.findOneAndUpdate(
      { title: product.title },
      product,
      { new: true, upsert: true, runValidators: true }
    );
  }
};

module.exports = ensureProducts;
