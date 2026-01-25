import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // 🔥 SEND LOGIN REQUEST TO BACKEND
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // 🎉 Save JWT Token
      localStorage.setItem("token", data.token);

      // 🎉 Save user details to keep login even after refresh
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          avatar: data.user.name[0].toUpperCase(), // First letter as Avatar
          role: data.user.role,
        })
      );

      alert("Login successful!");

      // 🔥 Notify parent (Navbar) to update UI
      if (onLoginSuccess) onLoginSuccess();

      // Close modal
      onClose();

      // 🔄 Optional: redirect or refresh page
      window.location.reload();

    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error! Check backend.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">

      <label>
        Email:
        <input type="email" name="email" placeholder="Enter your email" />
      </label>

      <label>
        Password:
        <input type="password" name="password" placeholder="Enter your password" />
      </label>

      <button className="login-btn primary" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="back-home" onClick={onClose}>
        ← Back to Home
      </div>

    </form>
  );
}

export default LoginForm;
