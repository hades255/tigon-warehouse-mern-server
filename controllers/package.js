const createHttpError = require("http-errors");
const Package = require("../models/Package");
const User = require("../models/user");

const list = async (req, res, next) => {
  try {
    const { search, page, perpage, sort, sortdir } = req.query;
    const total = await Package.estimatedDocumentCount();
    const packages = await Package.find(
      search ? { $text: { $search: search } } : {}
    )
      .sort({ [sort]: sortdir === "asc" ? 1 : -1 })
      .skip((page - 1) * perpage)
      .limit(perpage)
      .populate(["recorder", "assign"])
      .exec();
    res.json({ total, packages });
  } catch (error) {
    next(createHttpError(500));
  }
};

const create = async (req, res, next) => {
  try {
    const newPkg = new Package({ ...req.body, recorder: req.me._id });
    await newPkg.save();
    res.json(newPkg);
  } catch (error) {
    next(createHttpError(500));
  }
};

const read = (req, res) => {
  if (req.pkg) return res.json(req.pkg);
  else return res.status(404).json({ message: "Package not found" });
};

const update = async (req, res, next) => {
  try {
    const { images, date, trackingNumber, customer, package } = req.body;
    if (images) req.pkg.images = [...images];
    if (date) req.pkg.date = date;
    if (trackingNumber) req.pkg.trackingNumber = trackingNumber;
    if (customer) req.pkg.customer = { ...customer };
    if (package) req.pkg.package = { ...package };
    if (!req.pkg.recorder) req.pkg.recorder === req.me._id;
    await req.pkg.save();
    res.json(req.pkg);
  } catch (error) {
    next(createHttpError(500));
  }
};

const remove = async (req, res, next) => {
  try {
    await Package.findByIdAndDelete(req.pkg._id);
    res.json({ msg: "OK" });
  } catch (error) {
    next(createHttpError(500));
  }
};

const setAssign = async (req, res, next) => {
  try {
    req.pkg.assign = [...req.body.assign];
    for (let user of req.body.assign) {
      await User.findByIdAndUpdate(user, { package: req.pkg._id });
    }
    req.pkg.status = "Assigned";
    await req.pkg.save();
    res.json(req.pkg);
  } catch (error) {
    next(createHttpError(500));
  }
};

module.exports = { list, create, read, update, remove, setAssign };
