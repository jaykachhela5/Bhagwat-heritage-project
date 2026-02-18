const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  amount: Number,
  message: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donor", donorSchema);
