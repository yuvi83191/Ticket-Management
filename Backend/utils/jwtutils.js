const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // Let the middleware handle invalid/expired token case
  }
};

exports.getRoleFromToken = (token) => {
  const decoded = exports.verifyToken(token);
  return decoded?.role || null;
};
