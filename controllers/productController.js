const Product = require("../models/Product"); 
const productController = {
    addProduct: async(req, res) => {
        try {
            const newProduct = await new Product({
                productName: req.body.productName, 
                price: req.body.price,
                quantity: req.body.quantity, 
                size: req.body.size, 
                color: req.body.color,
                category: req.body.category, 
                classify: req.body.classify, 
                description: req.body.description,
                imageUrl: req.body.imageUrl, 
                comment: req.body.comment, 
                newArrival: req.body.newArrival, 
            })
            await newProduct.save();
            res.status(200).json("THÊM SẢN PHẨM MỚI THÀNH CÔNG");
        } catch (err) {
            res.status(500).json("THÊM SẢN PHẨM MỚI THẤT BẠI");
        }
    },
    getAllProduct: async(req, res) => {
        try {
            const allProduct = await Product.find(); 
            res.status(200).json(allProduct)
        } catch (err) {
            res.status(500).json("LỖI KHI LẤY TẤT CẢ SẢN PHẨM")
        }
    },
    getProductById: async(req, res) => {
        try {
            const product = await Product.findById(req.params.id); 
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json("LẤY SẢN PHẨM BẰNG ID THẤT BẠI")
        }
    }
}

module.exports = productController;