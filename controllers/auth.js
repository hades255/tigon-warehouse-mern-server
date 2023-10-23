// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const createHttpError = require("http-errors");

// Register a new user
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(createHttpError(500));
  }
};

// Login a user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role, name: user.name, email: user.email },
      "secret-key",
      { expiresIn: "24h" }
    );
    res.json({ token, user });
  } catch (error) {
    next(createHttpError(500));
  }
};

const me = (req, res, next) => {
  res.json({
    user: req.me,
  });
};

module.exports = { register, login, me };
