const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    peopleServed: {
        type: Number,
        default: 0
    },  // ✅ comma added

    description: {   // ✅ proper structure added
        type: String
    },  // ✅ comma added

    registrations: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);