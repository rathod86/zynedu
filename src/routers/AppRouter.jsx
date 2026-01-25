import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "../component/Navbar.jsx";
import Home from "../component/Home.jsx";
import Features from "../component/features/Features.jsx";
import Dashboard from "../component/Dashboard/Dashboard.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

// Auth Components
import AuthModal from "../component/AuthModal/AuthModal.jsx";
import AuthCallback from "../pages/AuthCallback.jsx";

// Placeholder for feature pages
const PerformancePage = () => <h2>Performance Prediction</h2>;
const AdaptiveQuizPage = () => <h2>Adaptive Quiz</h2>;
const TutorPage = () => <h2>AI Tutor</h2>;
const SentimentPage = () => <h2>Sentiment Analysis</h2>;
const AnalyticsPage = () => <h2>Analytics Dashboard</h2>;

export default function AppRouter() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openLogin = () => {
    setAuthMode("login");
    setShowModal(true);
  };

  const openSignup = () => {
    setAuthMode("register");
    setShowModal(true);
  };

  return (
    <>
      {/* Navbar always shown */}
      <Navbar onLoginClick={openLogin} onSignupClick={openSignup} />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />

        {/* Authenticated Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* OAuth */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* AI Features */}
        <Route path="/ai-recommend" element={<Dashboard />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/adaptive-quiz" element={<AdaptiveQuizPage />} />
        <Route path="/tutor" element={<TutorPage />} />
        <Route path="/sentiment" element={<SentimentPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>

      {/* Modal */}
      {showModal && (
        <AuthModal mode={authMode} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
