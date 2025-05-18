
const Test = require('../models/Test');

class TestController {
    async getAllTest(req, res) {
        try {
            const tests = await Test.find({});
            res.json(tests);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
    async createTest(req, res) {
        try {
            const { name, room } = req.body;
            const newTest = new Test({ name, room });
            await newTest.save();
            res.status(201).json(newTest);
        } catch (error) {
            console.error("Lỗi khi thêm xét nghiệm:", error);
            res.status(500).json({ message: "Thêm xét nghiệm thất bại" });
        }
    }
    async updateTest(req, res) {
        try {
            const { id } = req.params;
            const { name, room } = req.body;

            const updated = await Test.findByIdAndUpdate(
                id,
                { name, room },
                { new: true } // Trả về bản ghi sau khi cập nhật
            );

            if (!updated) {
                return res.status(404).json({ message: "Không tìm thấy xét nghiệm." });
            }

            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server khi cập nhật xét nghiệm.", error });
        }
    }
    async deleteTest(req, res) {
        const { id } = req.params;
        try {
            const deletedTest = await Test.findByIdAndDelete(id);
            if (!deletedTest) {
                return res.status(404).json({ message: "Xét nghiệm không tồn tại." });
            }
            res.status(200).json({ message: "Xét nghiệm đã được xóa thành công.", id });
        } catch (error) {
            console.error("Lỗi khi xóa xét nghiệm:", error);
            res.status(500).json({ message: "Đã xảy ra lỗi khi xóa xét nghiệm." });
        }
    }
}

module.exports = new TestController();