const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Event = require("../models/Event");

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* GET EVENTS (NEWEST LAST) */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // 👈 IMPORTANT
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* UPLOAD EVENT */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "events" },
      async (error, result) => {
        if (error) return res.status(500).json(error);

        const event = new Event({
          title: req.body.title,
          peopleServed: req.body.peopleServed,
          image: result.secure_url
        });

        await event.save();
        res.json(event);
      }
    );

    result.end(req.file.buffer);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;