const express = require("express");
const multer = require("multer");
const path = require("path");
const maxSize = 4 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage, limits: { fileSize: maxSize } });

const router = express.Router();

router.post("/", upload.array("files", 5), (req, res) => {
  res.json({ files: req.files });
});

module.exports = router;
