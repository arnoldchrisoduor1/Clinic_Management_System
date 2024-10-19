const jwt = require('jsonwebtoken');

const authMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { userId: decoded.userId };
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }
  return {};
};

module.exports = authMiddleware;