const Workdate = require('../models/workdate');
const Doctor = require('../models/Doctor');
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
            const objecDoctorId = new mongoose.Types.ObjectId(doctorId ); // <-- BỔ SUNG DÒNG NÀY
            const schedules = await Workdate.find({ doctor_id: objecDoctorId });
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
}

module.exports = new WorkdateController();
