const router = require("express").Router();
const Cultural = require("../models/culturalModel");

/* GET */
router.get("/", async(req,res)=>{
const data = await Cultural.find();
res.json(data);
});

/* POST */
router.post("/", async(req,res)=>{
const newData = new Cultural(req.body);
await newData.save();
res.json(newData);
});

module.exports = router;