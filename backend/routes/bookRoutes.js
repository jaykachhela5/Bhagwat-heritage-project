const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Get all books
router.get("/", async (req,res)=>{
    const books = await Book.find();
    res.json(books);
});

// Add book
router.post("/", async (req,res)=>{
    const book = new Book(req.body);
    await book.save();
    res.json({message:"Book Added"});
});

// Delete book
router.delete("/:id", async (req,res)=>{
    await Book.findByIdAndDelete(req.params.id);
    res.json({message:"Book Deleted"});
});

module.exports = router;