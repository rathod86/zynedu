import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLoginClick, onSignupClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // logged-in user state

  // 🔍 Load user on refresh AND verify token from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:5000/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  }, []);

  // ⭐ GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  // ⭐ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // redirect home
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">ZynEdu</div>

      {/* MOBILE MENU ICON */}
      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* RIGHT SIDE BUTTONS */}
      <div className="nav-buttons">

        {/* IF USER NOT LOGGED IN */}
        {!user && (
          <>
            <button className="btn-login" onClick={onLoginClick}>
              Login
            </button>

            <button className="btn-signup" onClick={onSignupClick}>
              Sign Up
            </button>

            <button className="btn-google" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
          </>
        )}

        {/* IF USER LOGGED IN */}
        {user && (
          <>
            {/* Profile Circle */}
            <div className="profile-wrapper">
              <div className="profile-icon">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="profile-name">
                {user.name}
              </div>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
