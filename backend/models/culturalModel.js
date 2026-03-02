const mongoose = require("mongoose");

const culturalSchema = new mongoose.Schema({
title:String,
description:String,
image:String
});

module.exports = mongoose.model("Cultural", culturalSchema);