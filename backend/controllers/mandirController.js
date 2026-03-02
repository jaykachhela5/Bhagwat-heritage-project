const Mandir = require("../models/MandirContent");

exports.getMandir = async (req, res) => {
const data = await Mandir.findOne();
res.json(data);
};

exports.updateMandir = async (req, res) => {
const updated = await Mandir.findOneAndUpdate({}, req.body, { new: true, upsert: true });
res.json(updated);
};