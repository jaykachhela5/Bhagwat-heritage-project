const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  filename: String,
  path: String,
  cloudinary_id: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Media", MediaSchema);
