const jwt = require("jsonwebtoken");

class MiddlewareController {
    constructor() {
        this.verifyTokenAndAdmin = this.verifyTokenAndAdmin.bind(this);
    }
    // Dùng arrow function để giữ `this`
    // verifyToken = (req, res, next) => {
    //     const token = req.headers.token;
    //     if (token) {
    //         const accessToken = token.split(" ")[1];
    //         jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
    //             if (err) {
    //                 return res.status(403).json("Token is not valid");
    //             }
    //             req.user = user;
    //             next();
    //         });
    //     } else {
    //         return res.status(401).json("You're not authenticated");
    //     }
    // };

    //  Dùng arrow function để giữ `this`
    verifyTokenAndAdmin = (req, res, next) => {
        this.verifyToken(req, res, () => {  
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("You're not allowed to delete others");
            }
        });
    };
}

module.exports = new MiddlewareController();
