import React, { useEffect, useRef, useState } from "react";
import "./AuthModal.css";

import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

function AuthModal({ mode = "login", onClose }) {
  const [tab, setTab] = useState(mode); // "login" | "register"
  const modalRef = useRef();

  /* ---------------- Update tab when parent sends new mode ---------------- */
  useEffect(() => {
    setTab(mode);
  }, [mode]);

  /* ---------------- Close on ESC & Click outside ---------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleOutside);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleOutside);
    };
  }, [onClose]);

  return (
    <div className="auth-backdrop" role="dialog" aria-modal="true">
      <div className="auth-modal" ref={modalRef}>
        {/* Close Button */}
        <button className="auth-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* ---------------- Modal Header ---------------- */}
        <div className="auth-top">
          <div className="auth-logo">🧠</div>
          <h2>Welcome to ZynEdu</h2>
          <p className="muted">Sign in or create your new account</p>
        </div>

        {/* ---------------- Tabs ---------------- */}
        <div className="auth-tabs">
          <button
            className={`tab ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            Login
          </button>

          <button
            className={`tab ${tab === "register" ? "active" : ""}`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        {/* ---------------- Form Body ---------------- */}
        <div className="auth-body">
          {tab === "login" ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
