const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// student & admin
router.get("/student", auth(["student","admin"]), (req, res) => {
  res.json({ message: "Student dashboard data", user: req.user });
});

// admin only
router.get("/admin", auth(["admin"]), (req, res) => {
  res.json({ message: "Admin dashboard data", user: req.user });
});

module.exports = router;
