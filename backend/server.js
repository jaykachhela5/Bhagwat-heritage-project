require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const streamifier = require("streamifier");

const app = express();

/* Models */
const User = require("./models/User");
const Contact = require("./models/Contact");
const Media = require("./models/Media");
const Event = require("./models/Event");
const Join = require("./models/join");
const sendMail = require("./utils/sendMail");
const Devotee = require("./models/Devotee");
const Pathshala = require("./models/Pathshala");
const Book = require("./models/Book");
const Issue = require("./models/Issue");
const Member = require("./models/Member");

/* Routes */
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const donorRoutes = require("./routes/donorRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const eventRoutes = require("./routes/eventRoutes");
const spiritualRoutes = require("./routes/spiritualRoutes");
app.use("/api/mandir", require("./routes/mandirRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));

const connectDB = require("./config/db");
/* Cloudinary */
const cloudinary = require("./config/cloudinary");
const culturalRoutes = require("./routes/culturalRoutes");
const involvedRoutes = require("./routes/involvedRoutes");


/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ================= CLOUDINARY FILE UPLOAD ================= */

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "bhsft_gallery" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        const newMedia = new Media({
          filename: req.file.originalname,
          path: result.secure_url,
          cloudinary_id: result.public_id,
        });

        await newMedia.save();
        res.json({ message: "Uploaded Successfully", media: newMedia });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/api/join", async (req, res) => {
  try {
    const data = new Join(req.body);
    await data.save();
    res.json({ success: true, message: "Application Saved" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});
/* Get all media */
app.get("/media", async (req, res) => {
  const data = await Media.find().sort({ uploadDate: -1 });
  res.json(data);
});

app.post("/api/pathshala", async (req, res) => {
    try {
        const newStudent = new Pathshala(req.body);
        await newStudent.save();
        res.status(201).json({ message: "Admission Submitted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error submitting form" });
    }
});

app.get("/api/pathshala", async (req, res) => {
    const students = await Pathshala.find();
    res.json(students);
});

/* Delete media */
app.delete("/delete/:id", async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: "Media not found" });

    await cloudinary.uploader.destroy(media.cloudinary_id);
    await Media.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted Successfully" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/about.html"));
});
/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api/donor", donorRoutes);

app.use("/api/volunteers", volunteerRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/spiritual", spiritualRoutes);
app.use("/api/cultural", culturalRoutes);
app.use("/api/involved", involvedRoutes);
app.use(express.urlencoded({ extended: true }));
app.use("/api/devotee", require("./routes/devoteeRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/issue", require("./routes/issueRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));

/* FRONTEND */
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});

// Make sure you have dotenv configured at the top
require('dotenv').config();
const nodemailer = require('nodemailer');
app.post("/api/devotee",async(req,res)=>{
try{
const devotee = new Devotee(req.body);
await devotee.save();
res.json({message:"Form submitted successfully 🙏"});
}catch(err){
res.status(500).json({message:"Error saving data"});
}
});
// POST route for Join Form submission
app.post('/join', async (req, res) => {
  const { name, email, phone, city, age, interest, reason } = req.body;

  try {
    // 1️⃣ Create the transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app password
      },
    });

    // 2️⃣ Send email to Admin
    await transporter.sendMail({
      from: `"Join Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // admin email
      subject: `New Join Application from ${name}`,
      html: `
        <h2>New Join Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      `,
    });

    // 3️⃣ Send confirmation email to User
    await transporter.sendMail({
      from: `"Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for joining us, ${name}`,
      html: `
        <h2>Thank You for Joining!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for applying to join us. We have received your application and will contact you soon.</p>
        <p>Best regards,<br/>Admin Team</p>
      `,
    });

    // 4️⃣ Send response back to frontend
    res.send('Application submitted successfully! Check your email.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong. Please try again later.');
  }
});
/* ================= EVENT UPLOAD ================= */

app.post("/api/events", upload.single("image"), async (req,res)=>{
    try{
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "events" },
            async (error, uploaded)=>{
                if(error) return res.status(500).send(error);

                const event = await Event.create({
                    title: req.body.title,
                    peopleServed: req.body.peopleServed,
                    image: uploaded.secure_url
                });

                res.json(event);
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    }catch(err){
        res.status(500).send(err);
    }
});

/* Get Events */
app.get("/api/events", async(req,res)=>{
    const events = await Event.find().sort({date:-1});
    res.json(events);
});

/* ================= BOOK ROUTES ================= */

// Add Book
app.post("/api/books", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: "Book Added Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Books
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Book
app.delete("/api/books/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ================= ISSUE ROUTES ================= */

// Issue Book
app.post("/api/issue", async (req, res) => {
    try {
        const issue = new Issue(req.body);
        await issue.save();
        res.status(201).json({ message: "Book Issued Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Issues
app.get("/api/issues", async (req, res) => {
    try {
        const issues = await Issue.find().populate("bookId");
        res.json(issues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});