const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    studentName: String,
    phone: String,
    issueDate: Date,
    returnDate: Date,
    status: { type: String, default: "Issued" }
});

module.exports = mongoose.model("Issue", issueSchema);