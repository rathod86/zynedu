const express = require("express");
const auth = require("../middleware/auth");
const Course = require("../models/Course");
const router = express.Router();

// create course (admin)
router.post("/create", auth(["admin"]), async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json({ message: "Course Created", course });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// public list
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// get by id (protected)
router.get("/:id", auth(["student","admin"]), async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

module.exports = router;
