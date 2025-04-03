const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
class AppointmentController {
    async bookAppointment  (req, res)  {
        try {
            let { user_id, doctor_id, appointment_date, appointment_time, symptoms, isForSomeoneElse, patient_name, patient_age, patient_phone } = req.body;
            const mongoose = require("mongoose");
            user_id = new mongoose.Types.ObjectId(user_id);
            let patient;
            if (isForSomeoneElse && !user_id) {
                return res.status(400).json({ error: "user_id bị thiếu khi đặt hộ" });
            }
            if (isForSomeoneElse) {
                // Kiểm tra xem người được đặt hộ đã có hồ sơ chưa
                patient = await Patient.findOne({ name: patient_name, phone: patient_phone});

                if (!patient) {
                    // Nếu chưa có, tạo mới hồ sơ bệnh nhân hộ
                    patient = new Patient({
                        name: patient_name,
                        age: patient_age,
                        phone: patient_phone,
                        patient_code: `PAT-${Date.now()}`,
                    });
                    await patient.save();
                }
            } else {
                // Nếu đặt cho bản thân, kiểm tra xem Patient đã tồn tại chưa
                patient = await Patient.findOne({ user_id });

                if (!patient) {
                    // Nếu chưa có, tạo mới
                    patient = new Patient({
                        user_id,
                        patient_code: `PAT-${Date.now()}`,
                    });
                    await patient.save();
                }
            }

            // Tạo cuộc hẹn
            const newAppointment = new Appointment({
                patient_id: patient._id,
                doctor_id,
                appointment_date,
                appointment_time,
                symptoms,
                status: 'pending'
            });

            await newAppointment.save();

            res.status(201).json({ message: "Đặt lịch thành công!", appointment: newAppointment });

        } catch (error) {
            console.error("Lỗi đặt lịch:", error);
            res.status(500).json({ message: "Lỗi đặt lịch!", error: error.message });
        }
    };

}

module.exports = new AppointmentController();
