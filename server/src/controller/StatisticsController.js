
const Appointment = require('../models/Appointment');
class StatisticsController {
    async getAppointments(req, res) {
        try {
            const { type = 'month', from, to, appointment_type, status, doctor_id, pack_id } = req.query;

            // Khởi tạo bộ lọc
            const match = {};
            if (from || to) {
                match.appointment_date = {};
                if (from) match.appointment_date.$gte = new Date(from);
                if (to) match.appointment_date.$lte = new Date(to);
            }

            if (appointment_type) match.appointment_type = appointment_type;
            if (status) match.status = status;
            if (doctor_id) match.doctor_id = new mongoose.Types.ObjectId(doctor_id);
            if (pack_id) match.pack_id = new mongoose.Types.ObjectId(pack_id);

            // Format ngày tùy theo type
            let dateFormat;
            if (type === 'day') dateFormat = { $dateToString: { format: "%Y-%m-%d", date: "$appointment_date" } };
            else if (type === 'month') dateFormat = { $dateToString: { format: "%Y-%m", date: "$appointment_date" } };
            else if (type === 'year') dateFormat = { $dateToString: { format: "%Y", date: "$appointment_date" } };

            const stats = await Appointment.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: dateFormat,
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } },
                {
                    $project: {
                        _id: 0,
                        label: "$_id",
                        count: 1
                    }
                }
            ]);

            res.json({ type, data: stats });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi thống kê dữ liệu' });
        }
    }

}

module.exports = new StatisticsController();