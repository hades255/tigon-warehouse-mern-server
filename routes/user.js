// routes/userRoutes.js
const express = require("express");
const { list, update, read, all, free } = require("../controllers/user");
const { userById } = require("../middlewares/user");
const { auth, authenticated } = require("../middlewares/auth");
const { setRole, resetPwd } = require("../controllers/admin");

const router = express.Router();

router.get("/", list);
router.get("/all", all);
router.get("/free", free);

router
  .route("/:userId")
  .get(auth(), authenticated, read)
  .put(auth(), authenticated, update);
router
  .route("/admin/:userId")
  .put(auth("admin"), setRole)
  .patch(auth("admin"), resetPwd);

router.param("userId", userById);

module.exports = router;
