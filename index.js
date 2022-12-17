const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const aboutRoute = require("./routes/about");
const bannerRoute = require("./routes/banner"); 

const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// KẾT NỐI VỚI DATABASE
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// KIỂM TRA KẾT NỐI VỚI DATABASE
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: 500"));
db.once("open", function () {
    console.log("Connected DB successfully");
});

// ĐƯỜNG DẪN ĐẮNG KÍ ĐĂNG NHẬP
app.use("/", authRoute);

// ĐƯỜNG DẪN LẤY TẤT CẢ USER VÀ XÓA USER
app.use("/", userRoute);

// ĐƯỜNG DẪN THÊM SẢN PHẨM VÀ LẤY TẤT CẢ SẢN PHẨM
app.use("/", productRoute);

// ĐƯỜNG DẪN THÊM DATA ABOUT VÀ LẤY DỮ LIỆU ABOUT
app.use("/", aboutRoute);

// ĐƯỜNG DẪN THÊM DATA BANNER VÀ LẤY DATA BANNER
app.use("/", bannerRoute); 

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});
