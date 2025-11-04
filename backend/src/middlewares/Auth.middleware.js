const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware factory: returns middleware for specific roles
function authorize(allowedRoles = []) {
  return async (req, res, next) => {
    try {
      // 1. Get token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // { id, role }

      // 3. Fetch user from DB to ensure they still exist
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 4. Check role authorization
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Attach full user to request for use in route
      req.user = user;

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

module.exports = authorize;
