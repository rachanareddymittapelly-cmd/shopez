import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const starterProducts = [
  {
    _id: 'demo-1',
    title: 'Neon Drift Hoodie',
    category: 'Streetwear',
    description: 'Oversized fleece hoodie with glow-pop accents and a soft cloud interior.',
    mainImg: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
    price: 2499,
    discount: 18,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['trending', 'drop'],
    reviews: [{ name: 'Mira', rating: 5, comment: 'Main character hoodie. Soft and loud.' }],
  },
  {
    _id: 'demo-2',
    title: 'Pixel Pods Mini',
    category: 'Tech',
    description: 'Compact wireless earbuds with punchy bass and a case that fits tiny pockets.',
    mainImg: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',
    price: 3999,
    discount: 25,
    sizes: ['Standard'],
    tags: ['audio', 'sale'],
    reviews: [{ name: 'Ayaan', rating: 4, comment: 'Bass is crisp. Battery is solid.' }],
  },
  {
    _id: 'demo-3',
    title: 'Cloudstep Chunk Sneakers',
    category: 'Sneakers',
    description: 'Statement sneakers made for long scrolls, longer walks, and louder fits.',
    mainImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    price: 5299,
    discount: 15,
    sizes: ['6', '7', '8', '9', '10'],
    tags: ['fresh', 'sneakers'],
    reviews: [{ name: 'Dev', rating: 5, comment: 'Comfy and the color pops.' }],
  },
  {
    _id: 'demo-4',
    title: 'Gloss Bomb Care Kit',
    category: 'Beauty',
    description: 'Hydrating lip, skin, and glow essentials packed into a travel-ready pouch.',
    mainImg: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
    price: 1499,
    discount: 12,
    sizes: ['Standard'],
    tags: ['beauty', 'glow'],
    reviews: [{ name: 'Ira', rating: 5, comment: 'Cute packaging and quick results.' }],
  },
  {
    _id: 'demo-5',
    title: 'Cyber Cargo Pants',
    category: 'Streetwear',
    description: 'Utility cargos with relaxed street fit, roomy pockets, and a clean silver buckle detail.',
    mainImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    price: 2899,
    discount: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['street', 'utility'],
    reviews: [{ name: 'Nia', rating: 5, comment: 'Pockets for everything and still looks sharp.' }],
  },
  {
    _id: 'demo-6',
    title: 'Aura Crop Jacket',
    category: 'Streetwear',
    description: 'Lightweight cropped jacket with bold panels made for cafe runs and photo dumps.',
    mainImg: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    price: 3199,
    discount: 16,
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['jacket', 'new'],
    reviews: [{ name: 'Kiara', rating: 4, comment: 'Cute fit, easy to style.' }],
  },
  {
    _id: 'demo-7',
    title: 'SnapCharge Power Bank',
    category: 'Tech',
    description: 'Slim 10000mAh fast-charge power bank for long days, short cables, and low battery panic.',
    mainImg: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',
    price: 2199,
    discount: 22,
    sizes: ['Standard'],
    tags: ['power', 'travel'],
    reviews: [{ name: 'Rishi', rating: 5, comment: 'Saved my phone during travel.' }],
  },
  {
    _id: 'demo-8',
    title: 'Glow Keys Keyboard',
    category: 'Tech',
    description: 'Compact mechanical keyboard with soft RGB glow and satisfying clicky feedback.',
    mainImg: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80',
    price: 4599,
    discount: 19,
    sizes: ['Standard'],
    tags: ['desk', 'rgb'],
    reviews: [{ name: 'Sahil', rating: 5, comment: 'Looks amazing on my setup.' }],
  },
  {
    _id: 'demo-9',
    title: 'Retro Rush Trainers',
    category: 'Sneakers',
    description: 'Vintage-inspired trainers with cushioned soles and color blocking that lands every fit.',
    mainImg: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    price: 4799,
    discount: 14,
    sizes: ['6', '7', '8', '9', '10'],
    tags: ['retro', 'sneakers'],
    reviews: [{ name: 'Tara', rating: 4, comment: 'Retro but still fresh.' }],
  },
  {
    _id: 'demo-10',
    title: 'Midnight Court Highs',
    category: 'Sneakers',
    description: 'High-top sneakers with padded ankle support and a clean black-white court look.',
    mainImg: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
    price: 5999,
    discount: 17,
    sizes: ['6', '7', '8', '9', '10', '11'],
    tags: ['high-top', 'court'],
    reviews: [{ name: 'Arjun', rating: 5, comment: 'Solid ankle support and clean finish.' }],
  },
  {
    _id: 'demo-11',
    title: 'Dewy Skin Serum',
    category: 'Beauty',
    description: 'Everyday serum for a fresh, hydrated finish with a non-sticky feel.',
    mainImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    price: 999,
    discount: 10,
    sizes: ['30ml'],
    tags: ['skincare', 'dewy'],
    reviews: [{ name: 'Megha', rating: 5, comment: 'Lightweight and glowy.' }],
  },
  {
    _id: 'demo-12',
    title: 'Mini Cloud Perfume',
    category: 'Beauty',
    description: 'Pocket perfume with bright citrus, soft vanilla, and an easy everyday vibe.',
    mainImg: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    price: 1799,
    discount: 13,
    sizes: ['50ml'],
    tags: ['fragrance', 'mini'],
    reviews: [{ name: 'Zoya', rating: 4, comment: 'Small bottle, really nice scent.' }],
  },
]

const categories = ['all', 'Streetwear', 'Tech', 'Sneakers', 'Beauty']

function App() {
  const [view, setView] = useState('home')
  const [products, setProducts] = useState(starterProducts)
  const [selectedProduct, setSelectedProduct] = useState(starterProducts[0])
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('shopezUser') || 'null'))
  const [toast, setToast] = useState('Welcome to ShopEZ')
  const [authMode, setAuthMode] = useState('login')
  const [checkoutProduct, setCheckoutProduct] = useState(null)

  const token = user?.token

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem('shopezUser', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    if (token) {
      loadCart()
      loadOrders()
    }
  }, [token])

  const api = async (path, options = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Request failed')
    return data
  }

  const loadProducts = async () => {
    try {
      const data = await api('/products')
      if (data.length) setProducts(data)
    } catch {
      setToast('Using demo products until the backend is running')
    }
  }

  const loadCart = async () => {
    try {
      const data = await api('/cart')
      setCart(data.items || [])
    } catch {
      setCart(JSON.parse(localStorage.getItem('shopezCart') || '[]'))
    }
  }

  const loadOrders = async () => {
    try {
      const data = await api('/orders/my')
      setOrders(data)
    } catch {
      setOrders(JSON.parse(localStorage.getItem('shopezOrders') || '[]'))
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, products, search])

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.price - (item.price * (item.discount || 0)) / 100
    return sum + price * (item.quantity || 1)
  }, 0)

  const openProduct = (product) => {
    setSelectedProduct(product)
    setView('product')
  }

  const requireLogin = () => {
    if (!user) {
      setView('auth')
      setToast('Login first to keep your cart synced')
      return false
    }
    return true
  }

  const addToCart = async (product, size = product.sizes?.[0] || 'Standard') => {
    if (!requireLogin()) return

    try {
      const data = await api('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: product._id, size, quantity: 1 }),
      })
      setCart(data.items)
    } catch {
      const nextCart = [...cart]
      const existing = nextCart.find((item) => item.product === product._id && item.size === size)
      if (existing) existing.quantity += 1
      else nextCart.push({ ...product, product: product._id, size, quantity: 1 })
      setCart(nextCart)
      localStorage.setItem('shopezCart', JSON.stringify(nextCart))
    }

    setToast(`${product.title} added to cart`)
  }

  const shopNow = (product) => {
    if (!requireLogin()) return
    setCheckoutProduct(product)
    setView('checkout')
  }

  const submitAuth = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())
    const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register'

    try {
      const data = await api(endpoint, { method: 'POST', body: JSON.stringify(payload) })
      setUser(data)
      setView('home')
      setToast(`Hey ${data.name}, you are in`)
    } catch (error) {
      setToast(error.message)
    }
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    if (!requireLogin()) return

    const form = new FormData(event.currentTarget)
    const shippingAddress = Object.fromEntries(form.entries())
    const payload = {
      shippingAddress,
      paymentMethod: shippingAddress.paymentMethod,
      paymentNote: shippingAddress.paymentNote,
      ...(checkoutProduct ? { productId: checkoutProduct._id, quantity: 1 } : {}),
    }

    try {
      const order = await api('/orders', { method: 'POST', body: JSON.stringify(payload) })
      setOrders([order, ...orders])
      setCart(checkoutProduct ? cart : [])
      setCheckoutProduct(null)
      setView('confirmation')
      setToast('Order placed. Confirmation unlocked.')
    } catch {
      const items = checkoutProduct ? [{ ...checkoutProduct, quantity: 1 }] : cart
      const totalAmount = checkoutProduct
        ? checkoutProduct.price - (checkoutProduct.price * checkoutProduct.discount) / 100
        : cartTotal
      const order = {
        _id: `local-${Date.now()}`,
        items,
        shippingAddress,
        paymentMethod: shippingAddress.paymentMethod,
        totalAmount,
        orderStatus: 'order placed',
        createdAt: new Date().toISOString(),
      }
      const nextOrders = [order, ...orders]
      setOrders(nextOrders)
      localStorage.setItem('shopezOrders', JSON.stringify(nextOrders))
      if (!checkoutProduct) {
        setCart([])
        localStorage.setItem('shopezCart', '[]')
      }
      setCheckoutProduct(null)
      setView('confirmation')
      setToast('Demo order placed locally')
    }
  }

  const logout = () => {
    setUser(null)
    setCart([])
    setOrders([])
    localStorage.removeItem('shopezUser')
    setView('home')
    setToast('Logged out. Come back for the next drop.')
  }

  return (
    <div className="app">
      <Header user={user} cartCount={cart.length} setView={setView} logout={logout} />
      {toast && <div className="toast">{toast}</div>}

      {view === 'home' && (
        <Home
          products={filteredProducts}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          openProduct={openProduct}
          addToCart={addToCart}
          shopNow={shopNow}
        />
      )}
      {view === 'product' && (
        <ProductDetails product={selectedProduct} addToCart={addToCart} shopNow={shopNow} />
      )}
      {view === 'cart' && (
        <Cart cart={cart} setCart={setCart} total={cartTotal} setView={setView} />
      )}
      {view === 'checkout' && (
        <Checkout product={checkoutProduct} cart={cart} total={cartTotal} submit={placeOrder} user={user} />
      )}
      {view === 'confirmation' && <Confirmation orders={orders} setView={setView} />}
      {view === 'profile' && <Profile user={user} orders={orders} setView={setView} />}
      {view === 'auth' && (
        <Auth authMode={authMode} setAuthMode={setAuthMode} submitAuth={submitAuth} />
      )}
      {view === 'admin' && <Admin user={user} products={products} api={api} setToast={setToast} />}
    </div>
  )
}

function Header({ user, cartCount, setView, logout }) {
  return (
    <header className="nav">
      <button className="brand" onClick={() => setView('home')}>
        <span>ShopEZ</span>
        <small>drop it. cart it. flex it.</small>
      </button>
      <nav>
        <button onClick={() => setView('home')}>Products</button>
        <button onClick={() => setView('cart')}>Cart ({cartCount})</button>
        <button onClick={() => setView('profile')}>Profile</button>
        <button onClick={() => setView('admin')}>Admin</button>
        {user ? <button onClick={logout}>Logout</button> : <button onClick={() => setView('auth')}>Login</button>}
      </nav>
    </header>
  )
}

function Home({ products, category, setCategory, search, setSearch, openProduct, addToCart, shopNow }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">New drop live</span>
          <h1>Shop like your cart has a personality.</h1>
          <p>Streetwear, tech, beauty, and sneaker finds with discounts, reviews, and a checkout flow that keeps it smooth.</p>
          <div className="hero-actions">
            <button onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}>Shop Now</button>
            <button className="ghost">Explore Deals</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="price-chip">Up to 25% off</div>
          <img src={products[0]?.mainImg} alt={products[0]?.title} />
        </div>
      </section>

      <section className="toolbar" id="catalog">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the drip..." />
        <div className="chips">
          {categories.map((item) => (
            <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            openProduct={openProduct}
            addToCart={addToCart}
            shopNow={shopNow}
          />
        ))}
      </section>
    </main>
  )
}

function ProductCard({ product, openProduct, addToCart, shopNow }) {
  const finalPrice = Math.round(product.price - (product.price * (product.discount || 0)) / 100)

  return (
    <article className="product-card">
      <button className="image-button" onClick={() => openProduct(product)}>
        <img src={product.mainImg} alt={product.title} />
      </button>
      <div className="product-info">
        <span>{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="price-row">
          <strong>Rs. {finalPrice}</strong>
          <small>{product.discount}% off</small>
        </div>
        <div className="card-actions">
          <button onClick={() => shopNow(product)}>Shop Now</button>
          <button className="icon-btn" onClick={() => addToCart(product)}>+</button>
        </div>
      </div>
    </article>
  )
}

function ProductDetails({ product, addToCart, shopNow }) {
  const [size, setSize] = useState(product.sizes?.[0] || 'Standard')
  const finalPrice = Math.round(product.price - (product.price * (product.discount || 0)) / 100)

  return (
    <main className="details">
      <img src={product.mainImg} alt={product.title} />
      <section>
        <span className="eyebrow">{product.category}</span>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className="price-row big">
          <strong>Rs. {finalPrice}</strong>
          <small>{product.discount}% discount applied</small>
        </div>
        <div className="chips">
          {product.sizes?.map((item) => (
            <button key={item} className={size === item ? 'active' : ''} onClick={() => setSize(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="hero-actions">
          <button onClick={() => shopNow(product)}>Shop Now</button>
          <button className="ghost" onClick={() => addToCart(product, size)}>Add To Cart</button>
        </div>
        <div className="reviews">
          <h3>Customer reviews</h3>
          {(product.reviews || []).map((review, index) => (
            <p key={index}><strong>{review.name}</strong> rated {review.rating}/5: {review.comment}</p>
          ))}
        </div>
      </section>
    </main>
  )
}

function Cart({ cart, setCart, total, setView }) {
  const updateQuantity = (id, quantity) => {
    const next = cart.map((item) => item._id === id || item.product === id ? { ...item, quantity } : item)
    setCart(next)
    localStorage.setItem('shopezCart', JSON.stringify(next))
  }

  return (
    <main className="panel">
      <h1>Your cart</h1>
      {!cart.length && <p className="empty">Your cart is waiting for its main character moment.</p>}
      <div className="cart-list">
        {cart.map((item) => (
          <article key={item._id || item.product} className="cart-item">
            <img src={item.mainImg} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>Size: {item.size || 'Standard'}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) => updateQuantity(item._id || item.product, Number(event.target.value))}
              />
            </div>
            <strong>Rs. {Math.round((item.price - (item.price * (item.discount || 0)) / 100) * item.quantity)}</strong>
          </article>
        ))}
      </div>
      <div className="summary">
        <span>Total</span>
        <strong>Rs. {Math.round(total)}</strong>
        <button disabled={!cart.length} onClick={() => setView('checkout')}>Checkout</button>
      </div>
    </main>
  )
}

function Checkout({ product, cart, total, submit, user }) {
  const checkoutTotal = product ? product.price - (product.price * product.discount) / 100 : total

  return (
    <main className="checkout">
      <section className="panel">
        <h1>Order details</h1>
        <p>{product ? product.title : `${cart.length} cart item(s)`}</p>
        <strong>Payable: Rs. {Math.round(checkoutTotal)}</strong>
      </section>
      <form className="form" onSubmit={submit}>
        <input name="name" placeholder="Full name" defaultValue={user?.name || ''} required />
        <input name="email" type="email" placeholder="Email" defaultValue={user?.email || ''} required />
        <input name="mobile" placeholder="Mobile number" required />
        <input name="address" placeholder="Shipping address" required />
        <input name="city" placeholder="City" required />
        <input name="pincode" placeholder="Pincode" required />
        <select name="paymentMethod">
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>
        <textarea name="paymentNote" placeholder="Payment note or product request" />
        <button>Place Order</button>
      </form>
    </main>
  )
}

function Confirmation({ orders, setView }) {
  const order = orders[0]
  return (
    <main className="panel confirmation">
      <span className="eyebrow">Order confirmed</span>
      <h1>Your ShopEZ order is locked in.</h1>
      {order && (
        <div className="receipt">
          <p>Order ID: {order._id}</p>
          <p>Status: {order.orderStatus}</p>
          <p>Total: Rs. {Math.round(order.totalAmount)}</p>
          <p>Payment: {order.paymentMethod}</p>
        </div>
      )}
      <button onClick={() => setView('profile')}>View Profile Orders</button>
    </main>
  )
}

function Profile({ user, orders, setView }) {
  if (!user) return <main className="panel"><h1>Login needed</h1><button onClick={() => setView('auth')}>Login</button></main>

  return (
    <main className="panel">
      <h1>{user.name}'s profile</h1>
      <p>{user.email}</p>
      <section className="orders">
        {orders.map((order) => (
          <article key={order._id} className="order-card">
            <strong>Rs. {Math.round(order.totalAmount)}</strong>
            <span>{order.orderStatus}</span>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

function Auth({ authMode, setAuthMode, submitAuth }) {
  return (
    <main className="auth">
      <form className="form auth-card" onSubmit={submitAuth}>
        <span className="eyebrow">{authMode === 'login' ? 'Welcome back' : 'Create account'}</span>
        <h1>{authMode === 'login' ? 'Login to ShopEZ' : 'Join ShopEZ'}</h1>
        {authMode === 'register' && <input name="name" placeholder="Name" required />}
        {authMode === 'register' && <input name="mobile" placeholder="Mobile" />}
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button>{authMode === 'login' ? 'Login' : 'Register'}</button>
        <button type="button" className="text-btn" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
          {authMode === 'login' ? 'Need an account?' : 'Already have an account?'}
        </button>
      </form>
    </main>
  )
}

function Admin({ user, products, api, setToast }) {
  const [stats, setStats] = useState({ users: 0, products: products.length, orders: 0, revenue: 0 })

  useEffect(() => {
    if (user?.role === 'admin') {
      api('/admin/stats').then(setStats).catch((error) => setToast(error.message))
    }
  }, [user])

  if (!user || user.role !== 'admin') {
    return (
      <main className="panel">
        <h1>Admin dashboard</h1>
        <p>Login as admin to manage products, orders, banners, and categories.</p>
        <p className="hint">Seed admin: admin@shopez.com / admin123</p>
      </main>
    )
  }

  return (
    <main className="admin">
      <section className="stat-grid">
        <Stat label="Users" value={stats.users} />
        <Stat label="Products" value={stats.products} />
        <Stat label="Orders" value={stats.orders} />
        <Stat label="Revenue" value={`Rs. ${Math.round(stats.revenue)}`} />
      </section>
      <section className="panel">
        <h1>Product command center</h1>
        <div className="mini-table">
          {products.map((product) => (
            <div key={product._id}>
              <span>{product.title}</span>
              <strong>Rs. {product.price}</strong>
              <small>{product.category}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }) {
  return (
    <article className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

export default App
