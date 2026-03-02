const router = require("express").Router();
const Spiritual = require("../models/spiritualModel");

router.get("/", async(req,res)=>{
const data = await Spiritual.find();
res.json(data);
});

router.post("/", async(req,res)=>{
const newData = new Spiritual(req.body);
await newData.save();
res.json(newData);
});

module.exports = router;