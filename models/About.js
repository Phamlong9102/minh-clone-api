const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
    {
        imageBanner: {
            type: String,
            required: true, 
        },
        information: {
            type: Array, 
            required: true
        }, 
        ourTeam: {
            type: String, 
            required: true, 
        }, 
        meetOurTeam: {
            type: String, 
            required: true, 
        }, 
        member: {
            type: Array, 
            required: true, 
        }
    },
    { timestamps: true },
    { collection: "abouts" }
)

module.exports = mongoose.model("About", aboutSchema);



