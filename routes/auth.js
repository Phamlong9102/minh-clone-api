const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController"); 

const router = require("express").Router();

// ĐĂNG KÍ
router.post("/register", authController.userRegister);

// ĐĂNG NHẬP
router.post("/login", authController.loginUser);

// DÙNG REFRESHTOKEN ĐỂ LẤY THẰNG ACCESSTOKEN MỚI VÀ REFRESHTOKEN MỚI
router.post("/refresh", authController.requestRefreshToken);

// ĐĂNG XUẤT
router.post("/logout", middlewareController.verifyToken, authController.userLogout); 

module.exports = router;
