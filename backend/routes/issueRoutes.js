const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
const Book = require("../models/Book");

// Issue book
router.post("/", async (req,res)=>{
    const issue = new Issue(req.body);
    await issue.save();

    await Book.findByIdAndUpdate(req.body.bookId,{
        $inc:{ available:-1 }
    });

    res.json({message:"Book Issued"});
});

// Get all issued
router.get("/", async(req,res)=>{
    const issues = await Issue.find().populate("bookId");
    res.json(issues);
});

module.exports = router;