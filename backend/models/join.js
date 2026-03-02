const mongoose = require("mongoose");

const joinSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  age: Number,
  interest: String,
  helpType: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Join", joinSchema);