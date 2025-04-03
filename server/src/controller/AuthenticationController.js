const user = require('../models/TestUser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

class AuthenticationController {
    // Đăng ký
    async register(req, res, next) {
        try {
            // console.log("Dữ liệu gửi lên:", req.body); // Kiểm tra dữ liệu từ FE
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            // console.log("Mật khẩu đã mã hóa:", hashed);
            const newUser = new user({
                name: req.body.name,
                username: req.body.username,
                password: hashed,
                age: req.body.age,
                phone: req.body.phone,
                address: req.body.address,
                email: req.body.email,
                gender: req.body.gender
            });

            await newUser.save();
            // console.log("Đã lưu user vào DB:", newUser);
            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    // Đăng nhập
    async login(req, res) {
        try {
            const User = await user.findOne({ username: req.body.username });
            if (!User) {
                return res.status(404).json({ message: "Sai tên đăng nhập!" });
            }

            const pass = await bcrypt.compare(req.body.password, User.password);
            if (!pass) {
                return res.status(404).json({ message: "Sai mật khẩu!" });
            }

            // Tạo token
            const accessToken = jwt.sign(
                { id: User._id, admin: User.admin },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "365d" }
            );

            const refreshToken = jwt.sign(
                { id: User._id, admin: User.admin },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: "365d" }
            );

            refreshTokens.push(refreshToken);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Lax"
            });

            const { password, ...others } = User._doc;
            return res.status(200).json({ ...others, accessToken });
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    // Yêu cầu refresh token
    async requestRefreshToken(req, res) {
        const refresh = req.cookies.refreshToken;

        if (!refresh) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
        }

        if (!refreshTokens.includes(refresh)) {
            return res.status(403).json({ message: "Refresh token không hợp lệ!" });
        }

        jwt.verify(refresh, process.env.JWT_REFRESH_KEY, (err, User) => {
            if (err) {
                return res.status(403).json({ message: "Token hết hạn hoặc không hợp lệ!" });
            }

            // Xóa token cũ khỏi danh sách
            refreshTokens = refreshTokens.filter((token) => token !== refresh);

            // Tạo token mới
            const newAccessToken = jwt.sign(
                { id: User.id, admin: User.admin },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "365d" }
            );

            const newRefreshToken = jwt.sign(
                { id: User.id, admin: User.admin },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: "365d" }
            );

            refreshTokens.push(newRefreshToken);

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Lax"
            });

            return res.status(200).json({ accessToken: newAccessToken });
        });
    }

    // Đăng xuất
    async logout(req, res) {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        return res.status(200).json({ message: "Đăng xuất thành công!" });
    }
}

module.exports = new AuthenticationController();
