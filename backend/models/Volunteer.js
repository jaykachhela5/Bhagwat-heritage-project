const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: 3
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ]
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    match: [
      /^[6-9]\d{9}$/,
      "Please enter a valid Indian phone number"
    ]
  },

  sevaArea: {
    type: String,
    required: [true, "Seva area is required"],
    trim: true
  },

  skills: {
    type: String,
    trim: true
  },

  message: {
    type: String,
    trim: true,
    maxlength: 500
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },

  adminNotes: {
    type: String,
    trim: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("Volunteer", volunteerSchema);