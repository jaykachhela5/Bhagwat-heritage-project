const router = require("express").Router();
const multer = require("multer");
const Media = require("../models/Media");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* Multiple Upload */
router.post("/upload", upload.array("images", 10), async (req, res) => {
  const files = req.files.map(file => ({
    filename: file.filename,
    filepath: "/uploads/" + file.filename
  }));

  await Media.insertMany(files);
  res.json("Uploaded");
});

/* Pagination + Search */
router.get("/media", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const search = req.query.search || "";

  const query = { filename: { $regex: search, $options: "i" } };

  const total = await Media.countDocuments(query);
  const data = await Media.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ uploadDate: -1 });

  res.json({ total, data });
});

/* Delete */
router.delete("/:id", async (req, res) => {
  await Media.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;
