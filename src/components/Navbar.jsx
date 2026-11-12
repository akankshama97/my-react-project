import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2 shadow-sm custom-navbar">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#!">
            <span className="me-2 fs-4">🛒</span>
            <span className="brand-title fw-bold">Apna Cart</span>
            <span className="badge bg-primary ms-3 rounded-pill px-3 py-2 fs-6">
              {this.props.totalItems} {this.props.totalItems === 1 ? 'item' : 'items'}
            </span>
          </a>
          <span className="text-light opacity-75 small d-none d-sm-inline ms-auto">
            Handcrafted React App ✨
          </span>
        </div>
      </nav>
    );
  }
}

export default Navbar;
