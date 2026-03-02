const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
amount: Number,
name: String,
email: String,
status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);