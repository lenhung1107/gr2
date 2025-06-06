
const Doctor = require('../models/Doctor');

class DoctorController {
    async getDoctor(req, res) {
        try {
            const doctors = await Doctor.find({})
                .populate('specialty', 'name') // chỉ lấy trường name của specialty
                .lean(); // giúp map dễ dàng hơn
            const updatedDoctors = doctors.map(doc => ({
                ...doc,
                specialty: doc.specialty?.name || null // tránh lỗi nếu specialty bị null
            }));
            // console.log(updatedDoctors);
            res.json(updatedDoctors);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
}

module.exports = new DoctorController();