require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");

const authRoutes = require("./routes/auth");
const contactRoutes = require('./routes/contactRoutes');
const Contact = require('./models/Contact'); // ✅ Added
const donorRoutes = require("./routes/donorRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");

const app = express();
app.use('/api', contactRoutes);

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* Routes */
app.use("/api/auth", authRoutes);
app.use('/api', contactRoutes); // Contact API handled in routes

/* FRONTEND FOLDER CONNECT */
app.use(express.static(path.join(__dirname, "../frontend")));

/* HOME PAGE ROUTE */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/about.html"));
});
app.get("/objectives",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/objectives.html"));
});
app.get("/manish-bhaiji",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/manish-bhaiji.html"));
});
/* DONATION API */
app.post("/api/donate", (req, res) => {
  const { name, amount } = req.body;
  console.log("Donation:", name, amount);
  res.json({
    success: true,
    message: "Donation successful"
  });
});
app.post("/api/auth/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, password, role });

  if (user) {
    res.json({
      success: true,
      role: user.role,
      name: user.name
    });
  } else {
    res.json({ success: false });
  }
});

app.get("/createUsers", async(req,res)=>{

await User.insertMany([
{ name:"Admin", email:"admin@gmail.com", password:"123", role:"admin" },
{ name:"Donor", email:"donor@gmail.com", password:"123", role:"donor" },
{ name:"Volunteer", email:"vol@gmail.com", password:"123", role:"volunteer" }
]);

res.send("Users Created");

});

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log("Connection Error:", err));

/* SERVER START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
