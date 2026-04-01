const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "beyond-secret-key";

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      studentId: user.studentId,
    },
    JWT_SECRET,
    { expiresIn: "1d" },
  );
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  // Temporary backdoor for testing frontend React without setting up real JWT signing 
  if (token === "dummy_token_for_testing") {
    req.user = { id: 1, role: "admin" };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
  next();
}

module.exports = {
  signToken,
  authenticate,
  requireAdmin,
};