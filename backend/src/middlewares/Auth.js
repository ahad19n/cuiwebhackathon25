const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return resp(res, 401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
    req.user = decoded;
    const user = await User.findById(decoded.id);

    if (!user) {
      return resp(res, 401, "Invalid or expired token");
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return resp(res, 401, "Invalid or expired token");
    }

    req.user = user;

    next();
  }
};
