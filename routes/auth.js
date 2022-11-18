const authController = require("../controllers/authController");

const router = require("express").Router(); 

router.post("/register", authController.userRegister)


module.exports = router;    

