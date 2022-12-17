const bannerController = require("../controllers/bannerController");

const router = require("express").Router();

// THÊM DATA BANNER
router.post("/add/banner", bannerController.addDataBanner);

// LẤY DATA BANNER
router.get("/get/banner", bannerController.getDataBanner);

module.exports = router; 