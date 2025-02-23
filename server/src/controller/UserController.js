
const User = require('../models/User');

class UserController {
    async getUser(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
    //delete user
    async deleteUser(req, res) {
        try {
            //đang giả sử tìm, nếu muốn xóa thật thì dùng findByIdAndDelete
           const user= await User.findById(req.params.id)
            res.status(200).json("delete success")
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
}

module.exports = new UserController();