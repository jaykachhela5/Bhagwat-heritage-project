const mongoose = require("mongoose");

const spiritualSchema = new mongoose.Schema({
title:String,
description:String,
image:String
});

module.exports = mongoose.model("Spiritual", spiritualSchema);