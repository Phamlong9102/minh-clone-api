const Banner = require("../models/Banner"); 

const bannerController = {
    addDataBanner: async(req, res) => {
        try {
            const newDataBanner = await new Banner({
                banner: req.body.banner, 
            }); 
            await newDataBanner.save(); 
            res.status(200).json("THÊM DATA BANNER THÀNH CÔNG")
        } catch (err) {
            res.status(500).json("THÊM DATA BANNER THẤT BẠI")
        }
    }, 

    getDataBanner: async(req, res) => {
        try {
            const dataBanner = await Banner.find(); 
            res.status(200).json(dataBanner)
        } catch (err) {
            res.status(500).json("LẤY DATA BANNER THẤT BẠI")
        }
    }
}

module.exports = bannerController; 


