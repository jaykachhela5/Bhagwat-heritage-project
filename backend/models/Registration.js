const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
name: String,
email: String
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);