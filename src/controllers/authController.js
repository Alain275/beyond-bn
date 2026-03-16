const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const { User } = require("../models");
const { signToken } = require("../middleware/auth");

const allowedRoles = new Set(["user", "admin"]);

function toSafeUser(user) {
  return {
    id: user.id,
    studentId: user.studentId,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

async function register(req, res) {
  try {
    const {
      firstName,
      lastName,
      phone = "",
      email,
      password,
      confirmPassword,
      role = "user",
    } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "firstName, lastName, email, password and confirmPassword are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirmPassword must match.",
      });
    }

    if (!allowedRoles.has(role)) {
      return res.status(400).json({
        message: "Role must be either user or admin.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with that email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: normalizedEmail,
      role,
      passwordHash,
    });

    const safeUser = toSafeUser(user);

    return res.status(201).json({
      message: "Registration successful.",
      token: signToken(safeUser),
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to register user right now.",
    });
  }
}

async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "identifier and password are required.",
      });
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: normalizedIdentifier }, { studentId: normalizedIdentifier.toUpperCase() }],
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const safeUser = toSafeUser(user);

    return res.status(200).json({
      message: "Login successful.",
      token: signToken(safeUser),
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to login right now.",
    });
  }
}

module.exports = {
  register,
  login,
};
