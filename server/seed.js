const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Admin = require('./models/Admin');

dotenv.config();

const products = [
  {
    title: 'Neon Drift Hoodie',
    description: 'Oversized fleece hoodie with glow-pop accents and a soft cloud interior.',
    mainImg: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
    carousel: [],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Streetwear',
    gender: 'unisex',
    price: 2499,
    discount: 18,
    tags: ['trending', 'drop'],
  },
  {
    title: 'Pixel Pods Mini',
    description: 'Compact wireless earbuds with punchy bass and a case that actually fits tiny pockets.',
    mainImg: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',
    carousel: [],
    sizes: ['Standard'],
    category: 'Tech',
    gender: 'unisex',
    price: 3999,
    discount: 25,
    tags: ['audio', 'sale'],
  },
  {
    title: 'Cloudstep Chunk Sneakers',
    description: 'Statement sneakers made for long scrolls, longer walks, and louder fits.',
    mainImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    carousel: [],
    sizes: ['6', '7', '8', '9', '10'],
    category: 'Sneakers',
    gender: 'unisex',
    price: 5299,
    discount: 15,
    tags: ['sneakers', 'fresh'],
  },
  {
    title: 'Gloss Bomb Care Kit',
    description: 'Hydrating lip, skin, and glow essentials packed into a travel-ready pouch.',
    mainImg: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
    carousel: [],
    sizes: ['Standard'],
    category: 'Beauty',
    gender: 'unisex',
    price: 1499,
    discount: 12,
    tags: ['beauty', 'glow'],
  },
];

const seed = async () => {
  await connectDB();
  try { await mongoose.connection.db.dropCollection('users'); } catch (err) {}
  try { await mongoose.connection.db.dropCollection('products'); } catch (err) {}
  try { await mongoose.connection.db.dropCollection('admins'); } catch (err) {}

  await User.create({
    name: 'ShopEZ Admin',
    email: 'admin@shopez.com',
    mobile: '9999999999',
    password: 'admin123',
    role: 'admin',
  });

  await Product.insertMany(products);
  await Admin.create({
    banner: {
      title: 'ShopEZ Drop Zone',
      subtitle: 'Fresh fits, smart tech, glow kits, and sneaker heat in one scroll.',
      image: '',
    },
    categories: [
      { name: 'Streetwear', color: '#ff3d71' },
      { name: 'Tech', color: '#00d4ff' },
      { name: 'Beauty', color: '#a3ff12' },
      { name: 'Sneakers', color: '#ffd60a' },
    ],
  });

  console.log('Seed data inserted. Admin login: admin@shopez.com / admin123');
  process.exit(0);
};

seed();
