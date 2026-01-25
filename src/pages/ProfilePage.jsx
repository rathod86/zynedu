// zynedu/src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import ProtectedRoute from "../component/ProtectedRoute";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // If backend has endpoint for profile, call it; otherwise parse token:
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch (e) {
      setUser(null);
    }
  }, []);

  return (
    <ProtectedRoute>
      <div style={{ padding: 20 }}>
        <h2>My Profile</h2>
        {user ? (
          <div>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p>No user data</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
