const About = require("../models/About");
const aboutController = {
    addDataAbout: async (req, res) => {
        try {
            const newDataAbout = await new About({
                imageBanner: req.body.imageBanner,
                information: req.body.information,
                ourTeam: req.body.ourTeam, 
                meetOurTeam: req.body.meetOurTeam, 
                member: req.body.member,
            });
            await newDataAbout.save();
            res.status(200).json("THÊM DATA ABOUT THÀNH CÔNG");
        } catch (err) {
            res.status(500).json("THÊM DATA MỚI THẤT BẠI");
        }
    },

    getDataAbout: async (req, res) => {
        try {
            const allDataAbout = await About.find();
            res.status(200).json(allDataAbout);
        } catch (err) {
            res.status(500).json("LỖI KHI LẤY DATA ABOUT");
        }
    },
};

module.exports = aboutController;
