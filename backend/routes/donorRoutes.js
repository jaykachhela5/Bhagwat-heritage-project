const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

router.post("/donor", async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.json({ message: "Donation Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
