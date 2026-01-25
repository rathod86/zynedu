const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

// ------------------------------------------
// ⭐ STEP 1 - Redirect user to Google Login
// ------------------------------------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ------------------------------------------
// ⭐ STEP 2 - Google Redirects here
// ------------------------------------------
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173" }),
  (req, res) => {
    const user = req.user;

    // Create JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
  }
);

module.exports = router;
