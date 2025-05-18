
const Pack = require('../models/Pack');

class PackController {
    async getPack(req, res) {
        try {
            const packs = await Pack.find({});
            res.json(packs);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
    async getPackById(req, res) {
        const { id } = req.params;
        try {
            const packs = await Pack.findById(id);
            res.json(packs);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
    async updatePack(req, res) {
        try {
            const updatedPack = await Pack.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedPack);
        } catch (err) {
            res.status(500).json({ error: "Lỗi khi cập nhật gói" });
        }
    }
    async deletePack(req, res) {
        try {

            const deletedPack = await Pack.findByIdAndDelete(req.params.id);
            if (!deletedPack) {
                return res.status(404).json({ message: 'Không tìm thấy bác sĩ' });
            }
            res.status(200).json({ message: 'Xóa bác sĩ thành công', pack: deletedPack });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Lỗi server khi xóa bác sĩ' });
        }
    }
    async addPack(req, res) {
        try {
            const { name, room, price, image, des } = req.body;

            const newPack = new Pack({ name, room, price, image, des });
            await newPack.save();

            res.status(201).json(newPack);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server khi thêm gói khám", error });
        }
    }
}

module.exports = new PackController();