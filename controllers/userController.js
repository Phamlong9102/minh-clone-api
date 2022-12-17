const User = require("../models/User"); 
const userController = {
    // HÀM LẤY TẤT CẢ USER
    getAllUsers: async(req, res) => {
        try {
            const allUser = await User.find(); 
            res.status(200).json(allUser)
        } catch (err) {
            res.status(500).json("Lỗi khi lấy tất cả user")
        }
    },
    // HÀM XÓA USER
    deleteUser: async(req, res) => {
        try {
            const user = await User.findById(req.params.id); 
            res.status(200).json("Bạn đã xóa thành công")
        } catch (err) {
            res.status(500).json(err)
        }
    } 

}

module.exports = userController; 