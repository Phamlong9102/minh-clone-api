const userController = require("../controllers/userController");

const router = require("express").Router(); 

// Get all users
router.get("/getall", userController.getAllUsers); 

// Delete user
router.delete("/delete/:id", userController.deleteUser); 

module.exports = router; 



