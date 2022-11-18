const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {
    // Register
    userRegister: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            // Create new user in Database
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
            });
            // Save new user to Database
            await newUser.save();
            res.status(200).json("Register successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({userName: req.body.userName});
            if(!user) {
                res.status(404).json
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword) {
                res.status(404).json("Wrong password")
            }
            if(user && validPassword) {
                res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json();
        }
    },
};

module.exports = authController;
