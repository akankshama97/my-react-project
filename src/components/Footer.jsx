import React, { useState } from 'react';

export default function Footer({
  subtotal,
  discount,
  grandTotal,
  couponCode,
  applyCoupon,
  removeCoupon,
  resetCart,
  openReceipt,
}) {
  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon.trim().toUpperCase());
    setInputCoupon('');
  };

  const handlePayNow = () => {
    if (subtotal === 0) {
      alert('Your cart is empty! Please increase quantity for at least one item before proceeding.');
      return;
    }
    openReceipt();
  };

  return (
    <footer className="fixed-bottom bg-dark text-white py-2 shadow-lg footer-bar">
      <div className="container">
        <div className="row align-items-center g-2">
          {/* Reset Button */}
          <div className="col-4 col-md-2">
            <button
              className="btn btn-outline-danger w-100 fw-semibold reset-btn btn-sm py-2"
              onClick={resetCart}
              title="Reset all item quantities to 0"
            >
              ↺ Reset
            </button>
          </div>

          {/* Coupon Code Section */}
          <div className="col-8 col-md-4">
            {couponCode ? (
              <div className="d-flex align-items-center justify-content-between bg-success-subtle border border-success px-2 py-1 rounded-2">
                <span className="text-success-emphasis small fw-bold">
                  🏷️ {couponCode} (-₹{discount.toLocaleString('en-IN')})
                </span>
                <button
                  type="button"
                  className="btn btn-sm text-danger p-0 fw-bold border-0 ms-2"
                  onClick={removeCoupon}
                  title="Remove coupon"
                >
                  ✕
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm me-1 rounded-2"
                  placeholder="Code: APNA10"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                />
                <button type="submit" className="btn btn-sm btn-outline-warning text-nowrap fw-semibold">
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Grand Total Display */}
          <div className="col-7 col-md-4 text-md-center">
            <span className="fs-6 d-block text-light">
              Total: <span className="text-warning fw-bold fs-5">₹{Number(grandTotal).toLocaleString('en-IN')}</span>
              {discount > 0 && (
                <span className="text-success small ms-2 d-none d-sm-inline">
                  (Saved ₹{discount.toLocaleString('en-IN')})
                </span>
              )}
            </span>
          </div>

          {/* Pay Now Button */}
          <div className="col-5 col-md-2 text-end">
            <button
              className="btn btn-success w-100 fw-bold pay-btn py-2"
              onClick={handlePayNow}
              title="View Invoice & Pay"
            >
              💳 Pay Now
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
