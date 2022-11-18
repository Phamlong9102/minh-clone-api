const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth"); 


const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Connect database
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check connect to DB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: 500"));
db.once("open", function () {
    console.log("Connected DB successfully");
});

// Auth route
app.use("/", authRoute); 

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
