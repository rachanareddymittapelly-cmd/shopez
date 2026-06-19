# ShopEZ MERN E-Commerce

ShopEZ is a Gen Z styled MERN e-commerce website with a React frontend, Express backend, MongoDB/Mongoose models, JWT authentication, cart, checkout, orders, profile, and admin dashboard.

## Folder Structure

```text
Client/
  src/
    App.jsx
    App.css
server/
  config/
  controllers/
  middleware/
  models/
  routes/
  utils/
  index.js
  seed.js
```

## Backend Setup

```bash
cd server
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

MongoDB connection:

```text
MONGO_URI=mongodb://localhost:27017/ShopEZ
```

For deployment, also set:

```text
FRONTEND_URL=https://your-frontend-url.onrender.com
```

Seed demo products and admin:

```bash
node seed.js
```

Admin login:

```text
admin@shopez.com
admin123
```

## Frontend Setup

```bash
cd Client
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

For deployment, set:

```text
VITE_API_URL=https://your-backend-url.onrender.com/api
```

The frontend includes demo fallback products so the UI still opens even before the backend is connected.

## Main API Routes

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
GET  /api/products
GET  /api/products/:id
POST /api/cart
GET  /api/cart
POST /api/orders
GET  /api/orders/my
GET  /api/admin/stats
GET  /api/admin/orders
POST /api/admin/products
```
