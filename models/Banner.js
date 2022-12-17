const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
    {
        banner: {
            type: Array, 
            required: true, 
        }
    },
    { timestamps: true },
    { collection: "banners" }
); 

module.exports = mongoose.model("Banner", bannerSchema);



