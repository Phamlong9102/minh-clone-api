const { findByIdAndDelete } = require("../models/User");
const User = require("../models/User"); 
const userController = {
    // Get all users
    getAllUsers: async(req, res) => {
        try {
            const allUser = await User.find(); 
            res.status(200).json(allUser)
        } catch (err) {
            res.status(500).json("Failed to get all user")
        }
    },
    // Delete user
    deleteUser: async(req, res) => {
        try {
            const user = await User.findById(req.params.id); 
            res.status(200).json("Delete successfully")
        } catch (err) {
            res.status(500).json(err)
        }
    } 

}

module.exports = userController; 