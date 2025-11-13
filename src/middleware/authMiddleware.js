const jwt = require("jsonwebtoken");

const SECRET = "shhhhh"; // 🔒 In production, move to process.env.JWT_SECRET

exports.authMiddleware = async (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];

  if (!token) {
    return { user: null }; // no token, user not logged in
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    // you can attach user info here (e.g., decoded.email)
    return { user: decoded };
  } catch (error) {
    console.error("❌ Invalid token:", error.message);
    return { user: null };
  }
};
