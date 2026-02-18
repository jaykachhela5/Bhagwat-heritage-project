const express = require("express");
const router = express.Router();

const objectivesData = [
  {
    title: "Spiritual Growth",
    description: "Promoting spiritual awareness through heritage programs."
  },
  {
    title: "Community Events",
    description: "Organizing devotional and cultural gatherings."
  },
  {
    title: "Education Support",
    description: "Supporting scholarships and value-based education."
  },
  {
    title: "Social Service",
    description: "Helping underprivileged communities through charity."
  },
  {
    title: "Environmental Care",
    description: "Promoting eco-friendly awareness campaigns."
  },
  {
    title: "Cultural Preservation",
    description: "Safeguarding traditions and scriptures."
  }
];

router.get("/", (req, res) => {
  res.json(objectivesData);
});

module.exports = router;
