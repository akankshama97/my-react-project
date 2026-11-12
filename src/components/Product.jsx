import React from 'react';

export default function Product(props) {
  const itemTotal = props.product.quantity * props.product.price;

  return (
    <div className="card shadow-sm border-0 mb-3 product-card">
      <div className="card-body py-3 px-4">
        <div className="row align-items-center text-center text-md-start g-3">
          {/* Product Name & Single Item Price */}
          <div className="col-12 col-md-4">
            <h5 className="mb-1 fw-bold text-dark">{props.product.name}</h5>
            <span className="badge bg-light text-dark border px-2 py-1 fs-6">
              ₹{Number(props.product.price).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
            <div className="btn-group quantity-group" role="group" aria-label="Quantity buttons">
              <button
                type="button"
                className="btn btn-outline-danger fw-bold px-3"
                onClick={() => props.decrementQuantity(props.product)}
                title="Decrease quantity"
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-warning disabled text-dark fw-bold px-3"
              >
                {props.product.quantity}
              </button>
              <button
                type="button"
                className="btn btn-outline-success fw-bold px-3"
                onClick={() => props.incrementQuantity(props.product)}
                title="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="col-6 col-md-3 text-md-center">
            <span className="text-muted small d-block">Subtotal:</span>
            <span className="fw-bold fs-5 text-primary">
              ₹{Number(itemTotal).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Remove Button */}
          <div className="col-6 col-md-2 text-end text-md-center">
            <button
              className="btn btn-outline-danger w-100 fw-semibold"
              onClick={() => props.removeItem(props.product)}
              title="Remove product"
            >
              🗑️ Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
