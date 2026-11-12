import React from 'react';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productPrice: '',
    };
  }

  quickItems = [
    { name: '🎧 Wireless Headphones', price: 1499 },
    { name: '⌚ Smartwatch Fit', price: 2499 },
    { name: '🎒 Laptop Backpack', price: 899 },
    { name: '☕ Ceramic Coffee Mug', price: 299 },
    { name: '🖱️ Ergonomic Mouse', price: 599 },
  ];

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.productName.trim();
    const price = Number(this.state.productPrice);

    if (!name) {
      alert('Please enter a product name!');
      return;
    }
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price greater than 0!');
      return;
    }

    this.props.addItem(name, price);
    this.setState({ productName: '', productPrice: '' });
  };

  render() {
    return (
      <div className="card shadow-sm border-0 mb-4 p-4 add-item-card">
        <h5 className="card-title fw-bold text-dark mb-3">
          ➕ Add New Product
        </h5>

        <form className="row g-3 align-items-end" onSubmit={this.handleSubmit}>
          <div className="col-12 col-md-5">
            <label htmlFor="InputName" className="form-label fw-semibold text-secondary">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="InputName"
              placeholder="e.g. Wireless Keyboard"
              name="productName"
              onChange={(e) => this.setState({ productName: e.target.value })}
              value={this.state.productName}
              required
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="inputPrice" className="form-label fw-semibold text-secondary">
              Price (₹)
            </label>
            <input
              type="number"
              min="1"
              className="form-control"
              id="inputPrice"
              placeholder="e.g. 799"
              name="productPrice"
              onChange={(e) => this.setState({ productPrice: e.target.value })}
              value={this.state.productPrice}
              required
            />
          </div>

          <div className="col-12 col-md-3">
            <button type="submit" className="btn btn-primary w-100 fw-bold add-btn">
              Add to Cart
            </button>
          </div>
        </form>

        {/* Quick Add Chips */}
        <div className="mt-3 pt-3 border-top">
          <span className="small text-muted fw-semibold me-2 d-block d-sm-inline mb-2 mb-sm-0">
            ⚡ Quick Add:
          </span>
          <div className="d-inline-flex flex-wrap gap-2">
            {this.quickItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-pill quick-chip"
                onClick={() => this.props.addItem(item.name, item.price)}
                title={`Click to quickly add ${item.name}`}
              >
                + {item.name} <span className="text-primary fw-bold">₹{item.price.toLocaleString('en-IN')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
