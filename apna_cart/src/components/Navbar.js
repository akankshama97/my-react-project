import React from "react";
class Navbar extends React.Component{
  render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                      Apna Cart
                      <span className="badge bg-primary ms-2 rounded-pill">
                        {this.props.totalItems}
                      </span>
                    </a>
      </div>
    </nav>
  );
}
}
export default Navbar;

