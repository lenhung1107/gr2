const jwt = require("jsonwebtoken");

class MiddlewareController {
    constructor() {
        this.verifyTokenAndAdmin = this.verifyTokenAndAdmin.bind(this);
    }
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
