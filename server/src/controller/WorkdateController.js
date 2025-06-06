const Workdate = require('../models/WorkDate');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const mongoose = require("mongoose");

class WorkdateController {
    async registerSchedule(req, res) {
        const { userId, schedules } = req.body;
        try {
            const objectUserId = new mongoose.Types.ObjectId(userId); // <-- BỔ SUNG DÒNG NÀY

            const allDoctors = await Doctor.find({});
            const doctor = allDoctors.find(doc => doc.user_id.equals(objectUserId));
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            const doctorId = doctor._id;
            const workDateDocs = [];

            for (const [dayWork, hourList] of Object.entries(schedules)) {
                // Kiểm tra xem ngày đó đã tồn tại trong DB cho bác sĩ chưa
                const existing = await Workdate.findOne({ dayWork, doctor_id: doctorId });

                if (existing) {
                    // Cập nhật thêm giờ mới (không trùng lặp)
                    const newHours = hourList.filter(hour => !existing.hourWork.includes(hour));
                    if (newHours.length > 0) {
                        existing.hourWork.push(...newHours);
                        await existing.save();
                        workDateDocs.push(existing);
                    }
                } else {
                    // Tạo mới
                    const newWorkDate = new Workdate({
                        dayWork,
                        hourWork: hourList,
                        doctor_id: doctorId
                    });
                    await newWorkDate.save();
                    workDateDocs.push(newWorkDate);
                }
            }

            return res.status(200).json({ message: 'Lưu lịch thành công', data: workDateDocs });
        }
        catch (err) {
            console.error("Lỗi khi lưu lịch làm việc", err);
            res.status(500).json({ error: 'Lỗi server khi lưu lịch làm việc.' });
        }
    }
    async getSchedulebyUserID(req, res) {
        const { userId } = req.params;
        try {
            const objectUserId = new mongoose.Types.ObjectId(userId); // <-- BỔ SUNG DÒNG NÀY

            const allDoctors = await Doctor.find({});
            const doctor = allDoctors.find(doc => doc.user_id.equals(objectUserId));
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            const doctorId = doctor._id;
            const schedules = await Workdate.find({ doctor_id: doctorId });
            const formatted = {};
            schedules.forEach(item => {
                formatted[item.dayWork] = item.hourWork;
            });
            res.json(formatted);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Lỗi server" });
        }
    }
    async getSchedulebyDoctorID(req, res) {
        const { doctorId } = req.params;
        try {
            const objecDoctorId = new mongoose.Types.ObjectId(doctorId);
            const schedules = await Workdate.find({ doctor_id: objecDoctorId });
            const appointments = await Appointment.find({
                doctor_id: objecDoctorId,
                status: { $ne: 'Đã hủy' }
            });

            const formatted = {};
            schedules.forEach(item => {
                formatted[item.dayWork] = item.hourWork;
            });

            const bookedAppointments = {};
            appointments.forEach(item => {
                const day = item.appointment_date.toISOString().split('T')[0];
                if (!bookedAppointments[day]) {
                    bookedAppointments[day] = [];
                }
                bookedAppointments[day].push(item.appointment_time);
            });

            res.json({ schedule: formatted, bookedAppointments });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Lỗi server" });
        }
    }
    async getworkHourofDoctor(req, res) {
        try {
            const userId = req.params.userId;
            const doctor = await Doctor.findOne({ user_id: userId });
            if (!doctor) {
                return res.status(404).json({ message: 'Không tìm thấy bác sĩ cho user_id này' });
            }
            const appointments = await Appointment.find({
                doctor_id: doctor._id
            }).select('appointment_date appointment_time status');
            const result = appointments.map(app => ({
                date: app.appointment_date,
                time: app.appointment_time,
                status: app.status
            }));
            return res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy lịch hẹn của bác sĩ', error });
        }

    }
}

module.exports = new WorkdateController();
