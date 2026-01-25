import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [priority, setPriority] = useState("");
  const [list, setList] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // 👉 Load categories when page loads
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/categories")
      .then((res) => setAllCategories(res.data.categories))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const getRecommendations = async () => {
    if (!category || !skills || !priority || !goal) {
      alert("⚠ Please fill all fields before continuing.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/recommend/skills", {
        category,
        skills: skills.split(",").map((s) => s.trim()),
        goal,
        priority,
      });

      setList(res.data.data);
    } catch (err) {
      console.error("Error fetching AI recommendations:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <hr className="divider" />

      <h2>AI Course Recommendations</h2>

      {/* ===================== USER INPUT FIELDS ===================== */}
      <div className="input-box">
        <label>Choose Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select Category --</option>

          {allCategories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="input-box">
        <label>Your current skills (comma separated):</label>
        <input
          type="text"
          placeholder="React, JavaScript, HTML"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div className="input-box">
        <label>What do you want to study next?</label>
        <input
          type="text"
          placeholder="Example: Full Stack, AI Basics, Data Analytics"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="input-box">
        <label>Your learning priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">-- Select Priority --</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* ===================== BUTTON ===================== */}
      <button className="recommend-btn" onClick={getRecommendations}>
        Get Recommendations
      </button>

      {/* ===================== RESULTS ===================== */}
      <div className="results">
        {list.length > 0 ? (
          <div>
            <h3>Recommended Courses:</h3>
            {list.map((item, i) => (
              <div key={i} className="card">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <small>
                  Score: {item.score ? item.score.toFixed(2) : "N/A"}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p className="hint">Fill the form and click the button.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
