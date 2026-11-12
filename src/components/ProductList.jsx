import React from 'react';
import Product from './Product';

export default function ProductList(props) {
  if (props.allProductsCount === 0) {
    return (
      <div className="card text-center p-5 shadow-sm border-0 my-4 empty-cart-card">
        <div className="fs-1 mb-2">🛒</div>
        <h4 className="fw-bold text-secondary">Your Cart is Empty</h4>
        <p className="text-muted mb-0">
          No items found. Add some products using the form or quick-add chips above!
        </p>
      </div>
    );
  }

  if (props.productList.length === 0 && props.searchQuery) {
    return (
      <div className="card text-center p-4 shadow-sm border-0 my-4 empty-cart-card">
        <div className="fs-2 mb-2">🔍</div>
        <h5 className="fw-bold text-secondary">No matching products found</h5>
        <p className="text-muted mb-0">
          No product matched <strong>"{props.searchQuery}"</strong>. Try checking your spelling or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {props.productList.map((product, i) => (
        <Product
          key={i}
          product={product}
          index={i}
          incrementQuantity={props.incrementQuantity}
          decrementQuantity={props.decrementQuantity}
          removeItem={props.removeItem}
        />
      ))}
    </div>
  );
}
