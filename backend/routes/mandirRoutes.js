const router = require("express").Router();
const controller = require("../controllers/mandirController");

router.get("/", controller.getMandir);
router.put("/", controller.updateMandir);

module.exports = router;