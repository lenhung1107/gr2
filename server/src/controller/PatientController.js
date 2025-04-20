
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
                    // Trường hợp khám hộ => thông tin đã có trong bảng Patient
                    return {
                        _id: p._id,
                        name: p.name,
                        age: p.age,
                        phone: p.phone,
                        patient_code: p.patient_code,
                        isForSomeone: true,
                    };
                } else {
                    // Trường hợp khám cho chính mình => lấy thông tin từ TestUser
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

            return res.status(200).json({
                doctor_id: doctor._id,
                patients: detailedPatients
            });
            //   return res.status(200).json({ doctor_id: doctor._id, patients });
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
                    // Trường hợp khám hộ => thông tin đã có trong bảng Patient
                    return {
                        _id: p._id,
                        name: p.name,
                        age: p.age,
                        phone: p.phone,
                        patient_code: p.patient_code,
                        isForSomeone: true,
                    };
                } else {
                    // Trường hợp khám cho chính mình => lấy thông tin từ TestUser
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
            //   return res.status(200).json({ doctor_id: doctor._id, patients });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Lỗi server khi lấy danh sách bệnh nhân.' });
        }
    }
}

module.exports = new PatientController();