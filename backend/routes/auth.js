const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Signup Successful" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN

module.exports = router;
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value
    })
  });

  const data = await res.json();

  if (data.success) {
    document.getElementById("msg").innerText = "Login Successful";
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = "Invalid Login";
  }
});
