import React from 'react';

export default function ReceiptModal({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  couponCode,
  deliveryFee,
  grandTotal,
}) {
  if (!isOpen) return null;

  const orderId = 'AC-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1060 }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div className="modal-header bg-dark text-white border-0 py-3 px-4 rounded-top-4">
            <h5 className="modal-title fw-bold d-flex align-items-center">
              <span className="me-2">🧾</span> Apna Cart - Order Invoice
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body p-4 printable-area">
            {/* Header / Meta */}
            <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
              <div>
                <h4 className="fw-bold mb-1 text-primary">🛒 Apna Cart</h4>
                <p className="text-muted small mb-0">Self-Made React Project Receipt</p>
                <span className="badge bg-success-subtle text-success-emphasis border px-2 py-1 mt-1">
                  Payment Status: PAID ✅
                </span>
              </div>
              <div className="text-end">
                <p className="mb-0 fw-semibold">Order ID: <span className="text-dark">#{orderId}</span></p>
                <p className="text-muted small mb-0">Date: {orderDate}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="table-responsive mb-3">
              <table className="table table-bordered table-sm align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th className="text-center" style={{ width: '80px' }}>Qty</th>
                    <th className="text-end" style={{ width: '120px' }}>Unit Price</th>
                    <th className="text-end" style={{ width: '120px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="fw-semibold">{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">₹{Number(item.price).toLocaleString('en-IN')}</td>
                      <td className="text-end fw-bold">
                        ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price Breakdown */}
            <div className="row justify-content-end">
              <div className="col-12 col-md-6">
                <div className="card bg-light border-0 p-3 rounded-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Subtotal:</span>
                    <span className="fw-semibold">₹{Number(subtotal).toLocaleString('en-IN')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="d-flex justify-content-between mb-1 text-success">
                      <span>Promo Discount ({couponCode}):</span>
                      <span className="fw-semibold">-₹{Number(discount).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Delivery Charges:</span>
                    <span className={deliveryFee === 0 ? 'text-success fw-bold' : 'fw-semibold'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <hr className="my-2" />

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5">Grand Total:</span>
                    <span className="fw-bold fs-4 text-primary">
                      ₹{Number(grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-muted small mt-4 pt-3 border-top">
              Thank you for shopping at <strong>Apna Cart</strong>! Crafted with ❤️ in React.
            </div>
          </div>

          <div className="modal-footer border-0 px-4 pb-4 pt-0">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 fw-semibold"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 fw-bold"
              onClick={() => window.print()}
            >
              🖨️ Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
