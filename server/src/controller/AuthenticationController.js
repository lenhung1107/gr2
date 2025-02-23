const user = require('../models/TestUser')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
let refreshTokens=[]
class AuthenticationController {
    //signup
    async register(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = new user({
                name: req.body.name,
                username: req.body.username,
                password: hashed,
            });

            await newUser.save();
            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //login
    async login(req, res) {
        try {
            const User = await user.findOne({ username: req.body.username });
            if (!User) {
                return res.status(404).json({ message: "Sai tên đăng nhập !" });
            }

            const pass = await bcrypt.compare(req.body.password, User.password);
            if (!pass) {
                return res.status(404).json({ message: "Sai mật khẩu !" });
            }

            // Nếu đến đây, tức là cả User và pass đều hợp lệ
            const accessToken = jwt.sign(
                { id: User._id, admin: User.admin },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "20s" }
            );
            const refreshToken = jwt.sign({ id: User._id, admin: User.admin },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: "365d" })
            refreshTokens.push(refreshToken)   
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Lax"
            })
            const { password, ...others } = User._doc
            res.status(200).json({ ...others, accessToken });
        } catch (err) {
            res.status(500).json(err)
        }
    }
    async requestRefreshToken(req, res) {
        const refresh = req.cookies.refreshToken
        if (!refresh) {
            res.status(401).json("you're not authenticated")
        }
        if(!refreshTokens.includes(refresh))
        {
            return res.status(403).json("Refresh token is not valid")
        }
        jwt.verify(refresh, process.env.JWT_REFRESH_KEY, (err, User) => {
            if (err) {
                console.log(err)
            }
            refreshTokens=refreshTokens.filter((token)=> token!=refresh)
            const newAccessToken = jwt.sign(
                { id: User._id, admin: User.admin },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "20s" }
            );
            const newRefreshToken = jwt.sign({ id: User._id, admin: User.admin },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: "365d" })
            refreshTokens.push(newRefreshToken)   
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Lax"
            })
            res.status(200).json({accessToken: newAccessToken });
        })
      
    }
    async logout(req, res){
        res.clearCookie("refreshToken")
        refreshTokens=refreshTokens.filter(token => token !== req.cookies.refreshToken )
        res.status(200).json("Logged out success")
    }
}



module.exports = new AuthenticationController();
