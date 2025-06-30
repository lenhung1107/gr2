
const User = require('../models/TestUser');
const Doctor = require('../models/Doctor');
class UserController {
    async getUser(req, res) {
        try {
            const users = await User.find({role: 1});
            res.json(users);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            res.status(200).json({ message: 'Xóa người dùng thành công', user: deletedUser });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server khi xóa người dùng' });
        }
    }
    async deleteDoctor(req, res) {
        try {

            const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
            if (!deletedDoctor) {
                return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
            }
            res.status(200).json({ message: 'Xóa bác sĩ thành công', user: deletedDoctor });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server khi xóa bác sĩ' });
        }
    }
}

module.exports = new UserController();