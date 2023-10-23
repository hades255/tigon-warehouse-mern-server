const createHttpError = require("http-errors");
const Package = require("../models/Package");

const pkgById = async (req, res, next) => {
  try {
    const pkgId = req.params.pkgId; // Assuming the pkgId parameter is in the URL path
    const pkg = await Package.findById(pkgId)
      .populate(["recorder", "assign"])
      .exec(); // Assuming you have a findById method in your User model

    if (!pkg) {
      next(createHttpError(404));
    }

    req.pkg = pkg; // Attach the package object to the request object for later use
    next();
  } catch (error) {
    next(createHttpError(500));
  }
};

const can = async (req, res, next) => {
  try {
    if (
      req.me.role === "admin" ||
      (req.pkg.recorder &&
        req.me._id.toString() === req.pkg.recorder.toString())
    )
      next();
    else next(createHttpError(403));
  } catch (error) {
    next(createHttpError(500));
  }
};

module.exports = { pkgById, can };
