const createError = require("http-errors");

const setRole = async (req, res, next) => {
  try {
    console.log(req.user.role)
    console.log(req.body)
    req.user.role = req.body.role;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    next(createError(500));
  }
};

const resetPwd = async (req, res, next) => {
  try {
    req.user.password = "Welcome123!@#";
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    next(createError(500));
  }
};

module.exports = { setRole, resetPwd };
