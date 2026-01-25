const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* ================================
   REGISTER (No auto login)
================================ */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existing = await User.findOne({ email });
    if (existing) return res.json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashed });

    res.json({ message: "Registration successful" });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

/* ================================
   LOGIN (Return JWT)
================================ */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

/* ================================
   VERIFY TOKEN  🔥 (This was missing!)
================================ */
router.get("/verify", (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.json({ valid: false, message: "No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      valid: true,
      user: decoded,
    });
  } catch (err) {
    return res.json({ valid: false, message: "Invalid token" });
  }
});

module.exports = router;
