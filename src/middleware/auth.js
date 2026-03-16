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

module.exports = {
  signToken,
};