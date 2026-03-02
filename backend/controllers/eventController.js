const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.getEvents = async (req, res) => {
const events = await Event.find().sort({ date: 1 });
res.json(events);
};

exports.createEvent = async (req, res) => {
const event = new Event(req.body);
await event.save();
res.json(event);
};

exports.registerEvent = async (req, res) => {
const { eventId, name, email } = req.body;

const registration = new Registration({ eventId, name, email });
await registration.save();

await Event.findByIdAndUpdate(eventId, { $inc: { registrations: 1 } });

res.json({ message: "Registered Successfully" });
};