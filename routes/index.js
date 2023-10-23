var express = require("express");
var router = express.Router();
const auth = require("./auth");
const user = require("./user");
const pkg = require("./package");
const upload = require("./fs.js");

router.use("/auth", auth);
router.use("/users", user);
router.use("/packages", pkg);
router.use("/upload", upload);

module.exports = router;
