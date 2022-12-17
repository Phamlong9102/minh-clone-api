const router = require("express").Router();
const productController = require("../controllers/productController");

// THÊM SẢN PHẨM VÀO DATABASE
router.post("/add/product", productController.addProduct);

// LÂY TẤT CẢ SẢN PHẨM
router.get("/get/all/product", productController.getAllProduct);

// LẤY SẢN PHẨM BẰNG ID
router.get("/get/product/:id", productController.getProductById); 

module.exports = router;
