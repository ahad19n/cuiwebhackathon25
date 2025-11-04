const jwt = require("jsonwebtoken");
const { resp } = require("../helpers");
 
module.exports = (options = {}) => {
  return (req, res, next) => {
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) return resp(res, 401, 'Missing auth token');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (options.type && decoded.type !== options.type) {
        return resp(res, 403, 'Invalid token type');
      }

      req.token = decoded;
      next();
    }
            
    catch (error) {
      return resp(res, 401, 'Invalid or expired auth token');
    }
  }
}
