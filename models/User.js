const mongoose = require("mongoose");

// KHAI BÁO SCHEMA CÁC THÀNH PHẦN TRONG DATABASE
const userSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         required: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      admin: {
         type: Boolean,
         default: false,
      },
      cart: {
         type: Array, 
      }
   },
   { timestamps: true }, 
   { collection: "users" }, 
);

module.exports = mongoose.model("User", userSchema); 
