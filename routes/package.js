// routes/userRoutes.js
const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  list,
  create,
  read,
  update,
  remove,
  setAssign,
} = require("../controllers/package");
const { pkgById, can } = require("../middlewares/package");

const router = express.Router();

// router.get("/", auth("admin"), list);
router.route("/").get(list).post(auth("emp"), create);
router
  .route("/:pkgId")
  .get(read)
  .patch(auth("emp"), can, setAssign)
  .put(auth("emp"), can, update)
  .delete(auth("emp"), can, remove);

router.param("pkgId", pkgById);

module.exports = router;
