const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            const user = await User.findOne({ userName: req.body.userName });
            if (!user) {
                res.status(404).json;
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                res.status(404).json("Wrong password");
            }
            if (user && validPassword) {
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                        admin: false,
                    },
                    process.env.JWT_ACCESS_KEY,
                    { expiresIn: "30s" }
                );
                const { password, ...others } = user._doc; 
                res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json();
        }
    },
};

module.exports = authController;
