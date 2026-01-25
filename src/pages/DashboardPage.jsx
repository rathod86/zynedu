// zynedu/src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import ProtectedRoute from "../component/ProtectedRoute";

function DashboardPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/dashboard/student", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);
  return (
    <ProtectedRoute>
      <div style={{ padding: 20 }}>
        <h2>Student Dashboard</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;
