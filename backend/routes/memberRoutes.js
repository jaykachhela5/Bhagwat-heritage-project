const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// Add Member
router.post("/", async (req,res)=>{
    const member = new Member(req.body);
    await member.save();
    res.json({message:"Member Added"});
});

// Get Members
router.get("/", async(req,res)=>{
    const members = await Member.find();
    res.json(members);
});

module.exports = router;