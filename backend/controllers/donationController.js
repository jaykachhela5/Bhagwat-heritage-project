const Donation = require("../models/Donation");

exports.createDonation = async (req, res) => {
const donation = new Donation(req.body);
await donation.save();
res.json({ message: "Donation Saved", donation });
};

exports.getDonations = async (req, res) => {
const donations = await Donation.find().sort({ createdAt: -1 });
res.json(donations);
};