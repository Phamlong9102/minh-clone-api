const authController = require("../controllers/authController");

const router = require("express").Router(); 

// Regiter route
router.post("/register", authController.userRegister)

// Login route
router.post("/login", authController.loginUser)


module.exports = router;    

