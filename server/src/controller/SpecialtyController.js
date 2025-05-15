const Specialty = require('../models/Specialty');
const Doctor = require('../models/Doctor');
const SpecialtyController = {
    // Lấy danh sách chuyên khoa
    async getAllSpecialties(req, res) {
        try {
            const specialties = await Specialty.find(); // Chỉ lấy danh sách chuyên khoa
            res.json(specialties);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // Lấy thông tin chi tiết một chuyên khoa
    async getSpecialtyById(req, res) {
        try {
            const specialty = await Specialty.findById(req.params.id).lean(); // Lấy thông tin chi tiết chuyên khoa theo ID
            if (!specialty) return res.status(404).json({ message: 'Chuyên khoa không tồn tại.' });
            const doctors = await Doctor.find({ specialty: req.params.id })
                .populate('specialty', 'name') // chỉ lấy name trong specialty
                .lean();
            const doctorsWithSpecialtyName = doctors.map(doc => ({
                ...doc,
                specialty: doc.specialty.name // từ object -> chuỗi tên
            }));
            specialty.doctors = doctorsWithSpecialtyName;
            res.json(specialty);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // Thêm mới một chuyên khoa
};

module.exports = SpecialtyController;
