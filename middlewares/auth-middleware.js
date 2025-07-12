const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // is token availabel or not
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({
      success: false,
      message: "Access denied. No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.userInfo = decodedTokenInfo;
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      message: "Access denied. Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
