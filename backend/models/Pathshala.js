const mongoose = require("mongoose");

const PathshalaSchema = new mongoose.Schema({
    name: String,
    age: Number,
    parentName: String,
    phone: String,
    email: String,
    course: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Pathshala", PathshalaSchema);