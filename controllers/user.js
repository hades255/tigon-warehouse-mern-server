const createHttpError = require("http-errors");
const User = require("../models/user");

const list = async (req, res, next) => {
  try {
    const { search, page, perpage } = req.query;
    const total = await User.estimatedDocumentCount();
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .skip((page - 1) * perpage)
      .limit(perpage)
      .populate("package")
      .exec();
    res.json({ total, users });
  } catch (error) {
    next(createHttpError(500));
  }
};

const all = async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (error) {
    next(createHttpError(500));
  }
};

const free = async (req, res, next) => {
  try {
    const users = await User.find({
      package: { $exists: false },
    }).exec();
    res.json(users);
  } catch (error) {
    next(createHttpError(500));
  }
};

const read = (req, res) => {
  if (req.user) return res.json(req.user);
  else return res.status(404).json({ message: "User not found" });
};

const update = async (req, res, next) => {
  try {
    req.user = { ...req.user, ...req.body };
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    next(createHttpError(500));
  }
};

module.exports = { list, update, read, all, free };
