const express = require("express");
const router = express.Router();

// ✅ Correct Paths
const Join = require("../models/join");
const sendMail = require("../utils/sendMail");


// ================= SAVE FORM =================
router.post("/join", async (req, res) => {
  try {
    const data = new Join(req.body);
    await data.save();

    // SEND EMAIL
    await sendMail(req.body);

    res.json({
      success: true,
      message: "Application Submitted Successfully"
    });

  } catch (err) {
    res.status(500).json({
      error: "Server Error"
    });
  }
});


// ================= GET ALL =================
router.get("/", async (req, res) => {
  try {
    const data = await Join.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
});


// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    await Join.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;