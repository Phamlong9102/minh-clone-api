const aboutController = require("../controllers/aboutController");

const router = require("express").Router();

// THÊM DATA ABOUT
router.post("/add/about", aboutController.addDataAbout);

// LẤY DATA ABOUT
router.get("/get/data/about", aboutController.getDataAbout)

module.exports = router; 