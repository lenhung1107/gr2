const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class AppointmentController {
    async bookAppointment(req, res) {
        try {
            let { user_id, doctor_id, appointment_date, appointment_time, symptoms, isForSomeoneElse, patient_name, patient_age, patient_phone } = req.body;
            user_id = new mongoose.Types.ObjectId(user_id);
            let patient;
            if (isForSomeoneElse && !user_id) {
                return res.status(400).json({ error: "user_id bị thiếu khi đặt hộ" });
            }
            if (isForSomeoneElse) {
                // Kiểm tra xem người được đặt hộ đã có hồ sơ chưa
                patient = await Patient.findOne({ name: patient_name, phone: patient_phone });
                if (!patient) {
                    // Nếu chưa có, tạo mới hồ sơ bệnh nhân hộ
                    patient = new Patient({
                        user_id: user_id,
                        isForSomeone: true,
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
                user_id: user_id,
                patient_id: patient._id,
                doctor_id,
                appointment_date,
                appointment_time,
                symptoms,
                status: 'Đang chờ xác nhận'
            });

            await newAppointment.save();

            res.status(201).json({ message: "Đặt lịch thành công!", appointment: newAppointment });

        } catch (error) {
            console.error("Lỗi đặt lịch:", error);
            res.status(500).json({ message: "Lỗi đặt lịch!", error: error.message });
        }
    };
    async getAllAppointments(req, res) {
        try {
            const appointments = await Appointment.find()
                .populate({
                    path: 'patient_id',
                    populate: {
                        path: 'user_id',
                        model: 'TestUser',
                        select: 'name age phone' // Chỉ lấy các trường cần thiết
                    }
                })
                .populate({
                    path: 'doctor_id',
                    select: 'name'
                });

            // Xử lý dữ liệu
            const formattedAppointments = appointments.map((appt) => {
                const patient = appt.patient_id;
                const isForSomeone = patient.isForSomeone;
                const patientName = isForSomeone
                    ? patient.name
                    : patient.user_id?.name;

                const patientPhone = isForSomeone
                    ? patient.phone
                    : patient.user_id?.phone;

                const patientAge = isForSomeone
                    ? patient.age
                    : patient.user_id?.age;

                return {
                    _id: appt._id,
                    name: patientName,
                    phone: patientPhone,
                    age: patientAge,
                    date: appt.appointment_date,
                    hour: appt.appointment_time,
                    doctor: appt.doctor_id?.name,
                    symptoms: appt.symptoms,
                    status: appt.status
                };
            });
            res.status(200).json(formattedAppointments);

        } catch (err) {
            console.log("Lỗi lấy danh sách cuộc hẹn:", err);
            res.status(500).json({ message: "Lỗi server", err: err.message })
        }
    }
    async getAppointmentsByUserId(req, res) {
        try {
            const userId = req.params.id;
            const appointments = await Appointment.find({ user_id: userId })
                .populate({
                    path: 'patient_id',
                    populate: {
                        path: 'user_id',
                        model: 'TestUser',
                        select: 'name age phone' // Chỉ lấy các trường cần thiết
                    }
                })
                .populate({
                    path: 'doctor_id',
                    select: 'name'
                });

            // Xử lý dữ liệu
            const formattedAppointments = appointments.map((appt) => {
                const patient = appt.patient_id;
                const isForSomeone = patient.isForSomeone;
                const patientName = isForSomeone
                    ? patient.name
                    : patient.user_id?.name;

                const patientPhone = isForSomeone
                    ? patient.phone
                    : patient.user_id?.phone;

                const patientAge = isForSomeone
                    ? patient.age
                    : patient.user_id?.age;
                return {
                    isForSomeone: isForSomeone,
                    name: patientName,
                    phone: patientPhone,
                    age: patientAge,
                    date: appt.appointment_date,
                    hour: appt.appointment_time,
                    doctor: appt.doctor_id?.name,
                    symptoms: appt.symptoms,
                    status: appt.status
                };
            });
            res.status(200).json(formattedAppointments);

        } catch (err) {
            console.log("Lỗi lấy danh sách cuộc hẹn:", err);
            res.status(500).json({ message: "Lỗi server", err: err.message })
        }
    }
    async confirmAppointmentByAdmin(req, res) {
        const { id } = req.params;

        try {
            const updatedAppointment = await Appointment.findByIdAndUpdate(
                id,
                { status: 'Đang chờ khám' },
                { new: true }
            );

            if (!updatedAppointment) {
                return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
            }

            res.json({
                message: 'Đã xác nhận lịch hẹn thành công',
                appointment: updatedAppointment
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error });
        }
    }
    async getAppointmentsByDoctorId(req, res) {
        try {
            const userId = req.params.id;
            const doctor = await Doctor.findOne({ user_id: new ObjectId(userId) });
            if (!doctor) {
                return res.status(404).json({ message: 'Không tìm thấy bác sĩ với userId này' });
            }
            const appointments = await Appointment.find({ doctor_id: doctor._id })
                .populate({
                    path: 'patient_id',
                    populate: {
                        path: 'user_id',
                        model: 'TestUser',
                        select: 'name age phone' // Chỉ lấy các trường cần thiết
                    }
                })
                .populate({
                    path: 'doctor_id',
                    select: 'name'
                });

            // Xử lý dữ liệu
            const formattedAppointments = appointments.map((appt) => {
                const patient = appt.patient_id;
                const isForSomeone = patient.isForSomeone;
                const patientName = isForSomeone
                    ? patient.name
                    : patient.user_id?.name;

                const patientPhone = isForSomeone
                    ? patient.phone
                    : patient.user_id?.phone;

                const patientAge = isForSomeone
                    ? patient.age
                    : patient.user_id?.age;
                return {
                    _id: appt._id,
                    isForSomeone: isForSomeone,
                    name: patientName,
                    phone: patientPhone,
                    age: patientAge,
                    date: appt.appointment_date,
                    hour: appt.appointment_time,
                    doctor: appt.doctor_id?.name,
                    symptoms: appt.symptoms,
                    status: appt.status
                };
            });
            res.status(200).json(formattedAppointments);

        } catch (err) {
            console.log("Lỗi lấy danh sách cuộc hẹn:", err);
            res.status(500).json({ message: "Lỗi server", err: err.message })
        }
    }
    async confirmAppointmentByDoctor(req, res) {
        const { id } = req.params;
        try {
            const updatedAppointment = await Appointment.findByIdAndUpdate(
                id,
                { status: 'Đã khám' },
                { new: true }
            );

            if (!updatedAppointment) {
                return res.status(404).json({ message: 'Không tìm thấy cuộc hẹn' });
            }

            res.json({
                message: 'Đã xác nhận lịch hẹn thành công',
                appointment: updatedAppointment
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error });
        }
    }

}

module.exports = new AppointmentController();
