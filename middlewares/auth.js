// middlewares/auth.js
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = (role = "") => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "secret-key");
      if (!role || decoded.role === role || decoded.role === "admin") {
        req.me = decoded;
        next();
      } else {
        next(createHttpError(403));
      }
    } catch (error) {
      next(createHttpError(401));
    }
  };
};

const authenticated = (req, res, next) => {
  if (req.me._id.toString() === req.user._id.toString()) return next();
  next(createHttpError(403));
};

module.exports = { auth, authenticated };
