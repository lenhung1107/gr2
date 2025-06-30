const TestUser= require('../models/TestUser')
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
class PatientController {
    async getPatientByDoctorId(req, res) {
        const { userId } = req.params;
        try {
            const doctor = await Doctor.findOne({ user_id: userId });
            if (!doctor) {
                return res.status(404).json({ message: 'Không tìm thấy bác sĩ với user_id này.' })
            }
            const patients = await Patient.find({ doctor_id: doctor._id });
            const detailedPatients = await Promise.all(patients.map(async (p) => {
                if (p.isForSomeone) {
                    return {
                        _id: p._id,
                        name: p.name,
                        age: p.age,
                        phone: p.phone,
                        patient_code: p.patient_code,
                        isForSomeone: true,
                    };
                } else {
                    const user = await TestUser.findById(p.user_id);
                    return {
                        _id: p._id,
                        name: user?.name || null,
                        gender: user?.gender || null,
                        address: user?.address || null,
                        email: user?.email || null,
                        age: user?.age || null,
                        phone: user?.phone || null,
                        patient_code: p.patient_code,
                        isForSomeone: false,
                    };
                }
            }));

            return res.status(200).json({
                doctor_id: doctor._id,
                patients: detailedPatients
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Lỗi server khi lấy danh sách bệnh nhân.' });
        }
    }
    async getAllPatient(req, res) {
        try {
            const patients = await Patient.find();
            const detailedPatients = await Promise.all(patients.map(async (p) => {
                if (p.isForSomeone) {
                    return {
                        _id: p._id,
                        name: p.name,
                        age: p.age,
                        phone: p.phone,
                        patient_code: p.patient_code,
                        isForSomeone: true,
                    };
                } else {
                    const user = await TestUser.findById(p.user_id);
                    return {
                        _id: p._id,
                        name: user?.name || null,
                        gender: user?.gender || null,
                        address: user?.address || null,
                        email: user?.email || null,
                        age: user?.age || null,
                        phone: user?.phone || null,
                        patient_code: p.patient_code,
                        isForSomeone: false,
                    };
                }
            }));

            return res.status(200).json({
                patients: detailedPatients
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Lỗi server khi lấy danh sách bệnh nhân.' });
        }
    }
    async getPatientByUserId(req, res) {
        const { userId } = req.params;
        try {
            
            const patients = await Patient.find({ user_id: userId});
            const detailedPatients = await Promise.all(patients.map(async (p) => {
                if (p.isForSomeone) {
                    return {
                        _id: p._id,
                        name: p.name,
                        age: p.age,
                        phone: p.phone,
                        patient_code: p.patient_code,
                        isForSomeone: true,
                    };
                } else {
                    const user = await TestUser.findById(p.user_id);
                    return {
                        _id: p._id,
                        name: user?.name || null,
                        age: user?.age || null,
                        phone: user?.phone || null,
                        patient_code: p.patient_code,
                        isForSomeone: false,
                    };
                }
            }));

            res.status(200).json(detailedPatients);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Lỗi server khi lấy danh sách bệnh nhân.' });
        }
    }
}

module.exports = new PatientController();