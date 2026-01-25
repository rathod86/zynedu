import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="home-section">
      <h1>
        Welcome <span>ZynEdu</span>
      </h1>

      <p>
        Empower your learning with AI — personalized study recommendations,
        smart quizzes, and 24/7 AI tutoring powered by cutting-edge technology.
      </p>

      <div className="button-group">

        {/* Go to Features Page */}
        <button
          className="button-primary"
          onClick={() => navigate("/features")}
        >
          Get-Started
        </button>

        {/* Learn More -> also go to features OR separate page */}
        <button
          className="button-secondry"
          onClick={() => navigate("/features")}
        >
          Learn-More
        </button>

        {/* Syn-Skill -> go to new page (create later) */}
        <button
          className="button-third"
          onClick={() => navigate("/synskill")}
        >
          Syn-Skill
        </button>

      </div>

      <img src="/vite.svg" alt="Learning Illustration" />
    </section>
  );
}

export default Home;
