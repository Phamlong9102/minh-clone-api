const jwt = require("jsonwebtoken"); 

const middlewareController = {
    // HÀM CHECK TOKEN
    verifyToken: (req, res, next) => {
        // LẤY TOKEN TỪ HEADERS
        const token = req.headers.token; 
        // NẾU CÓ TOKEN
        if(token) {
            // LẤY TOKEN ĐẰNG SAU THẰNG BEARER
            const accessToken = token.split(" ")[1]; 
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                // NẾU LỖI 
                if(err) {
                    res.status(403).json("Token không hợp lệ hoặc đã hết hạn"); 
                }
                // KHÔNG LỖI THÌ TRẢ VỀ USER
                req.user = user; 
                next(); 
            })
        } else {
            res.status(401).json("Bạn chưa được xác thực")
        }
    }, 

    // HÀM CHECK TOKEN ĐỂ XEM CÓ QUYỀN LÀM GÌ ĐÓ HAY KHÔNG
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            // Nếu id của mình = id mình muốn xóa hoặc nếu là admin
            // NẾU ID HIỆN TẠI = ID MUỐN XÓA TRONG DATABASE HOẶC NẾU LÀ ADMIN
            if(req.user.id === req.params.id || req.user.admin) {
                // NẾU ĐÚNG THÌ TIẾP TỤC
                next(); 
            } else {
                res.status(403).json("Bạn không đủ quyền để thực hiện hành động này")
            }
        })
    }  
}

module.exports = middlewareController; 



