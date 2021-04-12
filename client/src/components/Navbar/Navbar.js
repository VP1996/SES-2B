import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand">
          AuthenticateUTS
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/student-login" className="nav-link">
                Student Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/teacher-login" className="nav-link">
                Teacher login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
    </div>
  );
};

export default Navbar;
