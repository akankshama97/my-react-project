import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import AddItem from './components/AddItem';
import ReceiptModal from './components/ReceiptModal';
import React, { useState, useEffect } from 'react';

const DEFAULT_PRODUCTS = [
  {
    name: 'iPhone 10S Max',
    price: 99999,
    quantity: 0,
  },
  {
    name: 'Redmi Note 10 Pro',
    price: 9999,
    quantity: 0,
  },
];

const FREE_DELIVERY_THRESHOLD = 2000;
const STANDARD_DELIVERY_FEE = 50;

export default function App() {
  // 1. LocalStorage Persistence
  const [productList, setProductList] = useState(() => {
    try {
      const saved = localStorage.getItem('apna_cart_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return DEFAULT_PRODUCTS;
  });

  // Save to localStorage whenever productList changes
  useEffect(() => {
    try {
      localStorage.setItem('apna_cart_products', JSON.stringify(productList));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [productList]);

  // 2. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Coupon & Discount State
  const [couponCode, setCouponCode] = useState('');

  // 4. Receipt Modal State
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Handlers
  const incrementQuantity = (index) => {
    setProductList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (index) => {
    setProductList((prevList) =>
      prevList.map((item, i) =>
        i === index && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const resetCart = () => {
    if (window.confirm('Reset all quantities in the cart to 0?')) {
      setProductList((prevList) =>
        prevList.map((item) => ({ ...item, quantity: 0 }))
      );
      setCouponCode('');
    }
  };

  const removeItem = (index) => {
    setProductList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const addItem = (name, price) => {
    if (!name || !name.trim()) return;
    setProductList((prevList) => [
      ...prevList,
      {
        name: name.trim(),
        price: Number(price) || 0,
        quantity: 0,
      },
    ]);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'APNA10') {
      setCouponCode('APNA10');
      alert('🎉 Coupon APNA10 Applied! 10% Discount added.');
    } else if (cleanCode === 'FLAT100') {
      if (subtotal < 500) {
        alert('FLAT100 requires a minimum cart subtotal of ₹500.');
        return;
      }
      setCouponCode('FLAT100');
      alert('🎉 Coupon FLAT100 Applied! ₹100 Flat Discount added.');
    } else {
      alert('Invalid Coupon Code! Try using APNA10 or FLAT100.');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  // Calculations
  const subtotal = productList.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const totalItemsCount = productList.reduce(
    (total, item) => total + item.quantity,
    0
  );

  let discount = 0;
  if (couponCode === 'APNA10') {
    discount = Math.round(subtotal * 0.1);
  } else if (couponCode === 'FLAT100') {
    discount = Math.min(100, subtotal);
  }

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Filtered Products for Search
  const filteredProducts = productList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Delivery Progress Calculation
  const deliveryProgress = Math.min(
    100,
    Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  return (
    <div className="apna-cart-app">
      <Navbar totalItems={totalItemsCount} />

      <main className="container my-4" style={{ minHeight: '80vh', paddingBottom: '110px' }}>
        {/* Add Product Component with Quick Add */}
        <AddItem addItem={addItem} />

        {/* Free Delivery Tracker Card */}
        <div className="card shadow-sm border-0 mb-4 p-3 delivery-tracker-card">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold text-dark small">
              {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                <span className="text-success fw-bold">
                  🎉 Congratulations! You have unlocked FREE Delivery!
                </span>
              ) : (
                <span>
                  🚚 Add{' '}
                  <strong className="text-primary">
                    ₹{(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString('en-IN')}
                  </strong>{' '}
                  more for <strong>FREE Delivery</strong>
                </span>
              )}
            </span>
            <span className="badge bg-light text-secondary border small">
              Goal: ₹{FREE_DELIVERY_THRESHOLD.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="progress" style={{ height: '8px' }}>
            <div
              className={`progress-bar ${
                subtotal >= FREE_DELIVERY_THRESHOLD ? 'bg-success' : 'bg-primary'
              }`}
              role="progressbar"
              style={{ width: `${deliveryProgress}%` }}
              aria-valuenow={deliveryProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        {/* Search & Cart Header */}
        <div className="card shadow-sm border-0 p-3 mb-3 cart-controls-card">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6">
              <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
                <span>🛍️ Products in Cart</span>
                <span className="badge bg-primary-subtle text-primary border ms-2 rounded-pill">
                  {productList.length} {productList.length === 1 ? 'item' : 'items'}
                </span>
              </h5>
            </div>

            {/* Live Search Bar */}
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary border-start-0"
                    type="button"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <ProductList
          productList={filteredProducts}
          allProductsCount={productList.length}
          searchQuery={searchQuery}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeItem={removeItem}
        />
      </main>

      {/* Fixed Footer with Promo Code & Pay Now */}
      <Footer
        subtotal={subtotal}
        discount={discount}
        deliveryFee={deliveryFee}
        grandTotal={grandTotal}
        couponCode={couponCode}
        applyCoupon={applyCoupon}
        removeCoupon={removeCoupon}
        resetCart={resetCart}
        openReceipt={() => setIsReceiptOpen(true)}
      />

      {/* Invoice Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        cartItems={productList.filter((p) => p.quantity > 0)}
        subtotal={subtotal}
        discount={discount}
        couponCode={couponCode}
        deliveryFee={deliveryFee}
        grandTotal={grandTotal}
      />
    </div>
  );
}
