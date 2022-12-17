const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ARRAY NÀY CÓ TÁC DỤNG KHI LOGIN ARRAY NÓ SẼ PUSH REFRESSTOKEN DÙNG ĐỂ LƯU TRỮ
let refreshTokens = [];
const authController = {
    // HÀM ĐĂNG KÍ
    userRegister: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            // TẠO 1 USER MỚI TRONG DATABASE
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
                cart: req.body.cart,
            });
            // LƯU USER VÀO TRONG DATABASE
            await newUser.save();
            res.status(200).json("Đẳng kí thành công");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // HÀM TẠO ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id, // HÀM TẠO ACCESS TOKEN
                admin: false,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "365d" }
        );
    },

    //HÀM TẠO REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: false,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    // HÀM ĐĂNG NHẬP
    loginUser: async (req, res) => {
        const { username: userName, password } = res.req.body || {};
        console.log("res.req.body", res.req.body);
        try {
            const user = await User.findOne({ userName });
            // CHECK USERNAME TRONG DATABASE
            if (!user) {
                res.status(403).json("TÀI KHOẢN KHÔNG TỒN TẠI");
            }
            const validPassword = await bcrypt.compare(password, user.password);
            // CHECK PASSWORD TRONG DATABASE
            if (!validPassword) {
                res.status(401).json("SAI MẬT KHẨU");
            }
            // NẾU CÓ USER NAME VÀ ĐÚNG PASSWORD
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                // LƯU TRỮ REFRESHTOKEN VÀO TRONG THẰNG REFRESHTOKENS
                refreshTokens.push(refreshToken);
                // LƯU REFRESHTOKEN VÀO COOKIE
                res.cookie("refreshToken", refreshToken, {
                    // OPTIONS CỦA COOKIE
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                // LOẠI PASSWORD KHỎI RESPONSE
                const { password, ...others } = user._doc;
                // TRẢ VỀ USER VÀ ACCESSTOKEN TRỪ PASSWORD
                res.status(200).json({ ...others, accessToken, refreshToken });
            }
        } catch (err) {
            res.status(500).json("ĐĂNG NHẬP THẤT BẠI");
        }
    },

    // HÀM YÊU CẦU CẤP ACCESSTOKEN VÀ REFRESHTOKEN MỚI
    requestRefreshToken: async (req, res) => {
        // LẤY REFRESH TOKEN TỪ COOKIE
        const refreshToken = req.cookies.refreshToken;
        // NẾU KHÔNG CÓ REFRESHTOKEN
        if (!refreshToken) {
            return res
                .status(401)
                .json("REFRESH TOKEN ĐÃ HẾT HẠN HOẶC BẠN CHƯA ĐĂNG NHẬP");
        }
        // NẾU CÓ REFRESHTOKEN MÀ REFRESHTOKEN KHÔNG PHẢI CỦA MÌNH HOẶC CỦA THẰNG NÀO ĐÓ
        if (!refreshTokens.includes(refreshToken)) {
            return res
                .status(403)
                .json("REFRESH TOKEN ĐANG SỬ DỤNG KHÔNG PHẢI CỦA BẠN");
        }
        // KIỂM TRA THẰNG REFRESHTOKEN
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            // NẾU CÓ LỖI
            if (err) {
                console.log("Có lỗi: ", err);
            }
            // KHI CÓ REFRESHTOKEN MỚI RỒI THÌ LỌC THẰNG REFRESHTOKEN CŨ RA
            refreshTokens = refreshTokens.filter(
                (token) => token !== refreshToken
            );
            // TẠO ACCESSTOKEN VÀ REFRESHTOKEN MỚI
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            // THÊM REFRESHTOKEN MỚI VÀO ARRAY CỦA MÌNH
            refreshTokens.push(newRefreshToken);
            // LƯU REFRESHTOKEN VÀO COOKIE
            res.cookie("refreshToken", newRefreshToken, {
                // OPTIONS CỦA COOKIE
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    },

    // ĐĂNG XUẤT
    userLogout: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
        );
        res.status(200).json("ĐĂNG XUẤT THÀNH CÔNG");
    },
};

module.exports = authController;
