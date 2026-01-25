const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const authRouters = require("./routers/authRouters");
const googleAuthRoutes = require("./routers/googleAuth");
const courseRouters = require("./routers/courseRouters");
const dashboardRoutes = require("./routers/dashboardRoutes");
const aiRoutes = require("./routers/aiRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use("/api/auth", authRouters);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/courses", courseRouters);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);   // ⬅ BEST FIX HERE

app.get("/", (req, res) => {
  res.send("ZynEdu backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
