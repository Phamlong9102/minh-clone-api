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
            const user = newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = authController;
