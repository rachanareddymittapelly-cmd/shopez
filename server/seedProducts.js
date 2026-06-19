const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const products = require('./data/products');

dotenv.config();

const seedProducts = async () => {
  await connectDB();

  for (const product of products) {
    await Product.findOneAndUpdate(
      { title: product.title },
      product,
      { new: true, upsert: true, runValidators: true }
    );
  }

  console.log(`${products.length} products added or updated.`);
  process.exit(0);
};

seedProducts();
