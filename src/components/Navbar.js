import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          INotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/aboutus" ? "active" : ""
                }`}
                to="/aboutus"
              >
                About Us
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
            <button className="btn btn-outline-success" type="submit">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
