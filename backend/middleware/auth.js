const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Not Authorized" });
      }

      // VERIFY TOKEN WITH ENV SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // ROLE CHECK (Admin / Student)
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access Denied" });
      }

      next();
    } catch (e) {
      console.error("JWT Error:", e.message);
      res.status(401).json({ error: "Invalid Token" });
    }
  };
};
