// zynedu/src/component/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  // token and user role should be parsed from token or stored user info
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;

  try {
    // simple decode without verification (frontend-only)
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (roles.length && !roles.includes(payload.role)) {
      return <Navigate to="/" replace />;
    }
  } catch (e) {
    // invalid token
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  return children;
}
