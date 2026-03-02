const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

/* =========================================
   1. CREATE VOLUNTEER (Public)
========================================= */
router.post("/create", async (req, res) => {
  try {
    const { fullName, email, phone, sevaArea, skills, message } = req.body;

    const volunteer = new Volunteer({
      fullName,
      email,
      phone,
      sevaArea,
      skills,
      message
    });

    await volunteer.save();

    res.status(201).json({
      success: true,
      message: "Volunteer application submitted successfully 🙏",
      data: volunteer
    });

  } catch (error) {

    // Duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/* =========================================
   2. GET ALL VOLUNTEERS (Admin)
========================================= */
router.get("/all", async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ isDeleted: false })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

/* =========================================
   3. GET SINGLE VOLUNTEER
========================================= */
router.get("/:id", async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer || volunteer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found"
      });
    }

    res.json({
      success: true,
      data: volunteer
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID"
    });
  }
});

/* =========================================
   4. APPROVE / REJECT VOLUNTEER (Admin)
========================================= */
router.put("/status/:id", async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found"
      });
    }

    res.json({
      success: true,
      message: `Volunteer ${status} successfully`,
      data: volunteer
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating status"
    });
  }
});

/* =========================================
   5. SOFT DELETE VOLUNTEER (Admin)
========================================= */
router.delete("/delete/:id", async (req, res) => {
  try {

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found"
      });
    }

    res.json({
      success: true,
      message: "Volunteer deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID"
    });
  }
});

module.exports = router;