const userController = require("../controllers/userController");
const router = require("express").Router(); 
const middlewareController = require("../controllers/middlewareController");

// LẤY TẤT CẢ USER
router.get("/getall", middlewareController.verifyToken, userController.getAllUsers); 

// XÓA USER
router.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth ,userController.deleteUser); 

module.exports = router; 



