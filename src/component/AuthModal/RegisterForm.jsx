// zynedu/src/component/AuthModal/RegisterForm.jsx
import React, { useState } from "react";
import "./RegisterForm.css";

function RegisterForm({ onClose, onRegisterSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      // 🎉 store token returned by backend
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Registration successful!");

      // callback to redirect user
      if (onRegisterSuccess) onRegisterSuccess();

      // close the modal
      onClose();
    } catch (err) {
      console.error(err);
      alert("Server error — try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <label>
        Full Name:
        <input type="text" name="name" placeholder="Enter your name" />
      </label>

      <label>
        Email:
        <input type="email" name="email" placeholder="Enter your email" />
      </label>

      <label>
        Password:
        <input type="password" name="password" placeholder="Enter your password" />
      </label>

      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
        />
      </label>

      <button className="register-btn primary" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Create Account"}
      </button>

      <div className="back-home" onClick={onClose}>
        ← Back to Home
      </div>
    </form>
  );
}

export default RegisterForm;
