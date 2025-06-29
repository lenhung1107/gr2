
const User = require('../models/TestUser');
const Doctor = require('../models/Doctor');
class UserController {
    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
             console.log(user);
             res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
    async editUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Lỗi cập nhật người dùng", error });
        }
    }
}

module.exports = new UserController();