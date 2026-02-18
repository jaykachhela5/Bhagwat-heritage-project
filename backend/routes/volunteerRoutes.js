const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

router.post("/volunteer", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.json({ message: "Volunteer Registered Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
