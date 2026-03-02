const mongoose = require("mongoose");

const mandirSchema = new mongoose.Schema({
title: String,
subtitle: String,
about: String,
morningTime: String,
afternoonTime: String,
eveningTime: String
}, { timestamps: true });

module.exports = mongoose.model("MandirContent", mandirSchema);