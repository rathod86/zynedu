import React from "react";
import { Link } from "react-router-dom";
import "./Features.css";
import FeatureCard from "./FeatureCard.jsx";
import { featuresList } from "./data.js";

export default function Features() {
  return (
    <section className="features-section">

      {/* Title */}
      <h2 className="features-title">Powered by Advanced AI & Machine Learning</h2>

      {/* Subtitle */}
      <p className="features-subtitle">
        Our platform combines cutting-edge AI technologies to deliver personalized learning experiences.
      </p>

      {/* 🔥 Move Navigation Cards to TOP */}
      <div className="features-grid">

        <Link to="/ai-recommend" className="feature-card">
          <h3>🎯 AI Recommendations</h3>
          <p>Personalized course suggestions using Hybrid AI models.</p>
        </Link>

        <Link to="/performance" className="feature-card">
          <h3>📊 Performance Prediction</h3>
          <p>Forecast academic performance using ML models.</p>
        </Link>

        <Link to="/adaptive-quiz" className="feature-card">
          <h3>⚡ Adaptive Quizzes</h3>
          <p>Dynamic quiz generation using LLMs like GPT-4o.</p>
        </Link>

        <Link to="/tutor" className="feature-card">
          <h3>💬 Virtual AI Tutor</h3>
          <p>Real-time AI-powered tutoring assistance.</p>
        </Link>

        <Link to="/sentiment" className="feature-card">
          <h3>⭐ Sentiment Analysis</h3>
          <p>Analyze user feedback using NLP models.</p>
        </Link>

        <Link to="/analytics" className="feature-card">
          <h3>📈 Real-time Analytics</h3>
          <p>Live dashboard analytics with WebSockets.</p>
        </Link>

      </div>

      {/* Old feature cards */}
      <div className="features-grid">
        {featuresList.map((item) => (
          <FeatureCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

    </section>
  );
}
