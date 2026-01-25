import React from "react";
import AiReco from "./icons/AiReco.jsx";
import Performance from "./icons/Performance.jsx";
import Adaptive from "./icons/Adaptive.jsx";
import Analytics from "./icons/Analytics.jsx";
import Sentiment from "./icons/Sentiment.jsx";
import Tutor from "./icons/Tutor.jsx";

const icons = {
  AiReco,
  Performance,
  Adaptive,
  Analytics,
  Sentiment,
  Tutor,
};

function FeatureCard({ title, description, icon, color }) {
  const IconComponent = icons[icon];

  return (
    <div className={`feature-card ${color}`}>
      <div className="icon-box">
        <IconComponent />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
