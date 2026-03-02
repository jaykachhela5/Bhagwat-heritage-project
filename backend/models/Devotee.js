const mongoose = require("mongoose");

const DevoteeSchema = new mongoose.Schema({
name:String,
email:String,
city:String,
message:String,
createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Devotee",DevoteeSchema);