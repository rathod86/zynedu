import React, { useState, useEffect } from "react";
import { getRecommendations } from "../services/recommendationService";

export default function AIRecommendationPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getRecommendations(1); // Example user ID = 1

      if (response && response.recommended) {
        setCourses(response.recommended);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">AI Recommendations</h1>

      {loading ? (
        <p className="text-lg">Loading recommendations...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((item, idx) => (
            <div key={idx} className="p-5 bg-white shadow rounded-xl">
              <h2 className="font-semibold text-xl">{item.course_name}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
