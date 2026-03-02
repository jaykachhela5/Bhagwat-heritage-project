const express = require("express");
const router = express.Router();
const Devotee = require("../models/Devotee");

router.post("/", async (req, res) => {
    try {
        const devotee = new Devotee(req.body);
        await devotee.save();
        res.json({ message: "Thank you for joining Seva 🙏" });
    } catch (err) {
        res.status(500).json({ message: "Error saving data" });
    }
});

module.exports = router;