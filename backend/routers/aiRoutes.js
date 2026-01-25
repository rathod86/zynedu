const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { category, skills, studyNext, priority } = req.body;

  try {
    const response = await axios.post("http://localhost:8000/recommend/skills", {
      category,
      skills,
      study_next: studyNext,
      priority
    });

    res.json(response.data);

  } catch (error) {
    console.error("Python AI error:", error.message);
    res.status(500).json({ error: "AI service not responding" });
  }
});

module.exports = router;
