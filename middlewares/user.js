const createHttpError = require("http-errors");
const User = require("../models/user");

const userById = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming the userId parameter is in the URL path
    const user = await User.findById(userId); // Assuming you have a findById method in your User model

    if (!user) {
        next(createHttpError(404));
    }

    req.user = user; // Attach the user object to the request object for later use
    next();
  } catch (error) {
    next(createHttpError(500));
  }
};

module.exports = { userById };
