const mongoose = require("mongoose");

const involvedSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    city: String,
    interest: String,
    message: String
},
{
    timestamps: true   // auto adds createdAt & updatedAt
});

module.exports = mongoose.model("Involved", involvedSchema);