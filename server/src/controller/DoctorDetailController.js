const Doctor = require('../models/Doctor');

class DoctorDetailController {
    async getDoctor(req, res, next) {
        try {
            const doctor = await Doctor.findOne({ _id: req.params.id })
                .populate('specialty', 'name')
                .lean();

            if (!doctor) {
                return res.status(404).json({ message: 'Không tìm thấy bác sĩ.' });
            }

            // Chuyển specialty thành tên
            doctor.specialty = doctor.specialty?.name || null;

            res.json(doctor);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new DoctorDetailController();
