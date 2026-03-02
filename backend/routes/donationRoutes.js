const router = require("express").Router();
const controller = require("../controllers/donationController");

router.post("/", controller.createDonation);
router.get("/", controller.getDonations);

module.exports = router;