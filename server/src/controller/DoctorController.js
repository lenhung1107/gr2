
const Doctor = require('../models/Doctor');

class DoctorController {
    async getDoctor(req, res) {
        try {
            const doctors = await Doctor.find({});
            res.json(doctors);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
}

module.exports = new DoctorController();