const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Event = require("../models/Event");
const controller = require("../controllers/eventController");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", controller.getEvents);
router.post("/", controller.createEvent);
router.post("/register", controller.registerEvent);
router.post("/", upload.single("image"), async (req,res)=>{
    try{
        const result = await cloudinary.uploader.upload_stream(
            { folder: "bhagwat-events" },
            async (error, result)=>{
                if(error) return res.status(500).json(error);

                const newEvent = new Event({
                    title: req.body.title,
                    date: req.body.date,
                    peopleServed: req.body.peopleServed,
                    image: result.secure_url
                });

                await newEvent.save();
                res.json(newEvent);
            }
        );

        result.end(req.file.buffer);

    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/", async(req,res)=>{
    const events = await Event.find().sort({date:-1});
    res.json(events);
});

module.exports = router;