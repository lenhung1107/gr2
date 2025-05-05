const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const TestOrder = require("../models/TestOrder");
class PrescriptionController {
    async createPrescription(req, res) {
        try {
            const { appointment_id, medicines, note,diagnosis } = req.body;
            const existingTestOrder = await TestOrder.findOne({
                appointment_id,
                status: 'Đang chờ'
              });
            if (!appointment_id || !Array.isArray(medicines) || medicines.length === 0) {
                return res.status(400).json({ message: 'Thiếu dữ liệu hoặc danh sách thuốc rỗng' });
            }
            if (existingTestOrder) {
                return res.status(400).json({ message: 'Bệnh nhân đang chờ kết quả xét nghiệm. Không thể nhập chuẩn đoán.' });
              }
            const newPrescription = new Prescription({
                appointment_id,
                medicines,
                note,
                diagnosis
            });

            await newPrescription.save();
            await Appointment.findByIdAndUpdate(appointment_id, {
                status: 'Đã khám'
            });
            res.status(201).json({
                message: 'Đơn thuốc đã được tạo thành công',
                prescription: newPrescription
            });
        } catch (error) {
            console.error('Lỗi khi tạo đơn thuốc:', error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    };
    async getPrescriptionByAppoinmentId(req, res) {
        const { id } = req.params;
        try {
            const prescription = await Prescription.findOne({ appointment_id: id })
                .populate({
                    path: 'appointment_id',
                    populate: {
                        path: 'doctor_id',
                        select: 'name',
                    }
                });
            if (!prescription) {
                return res.status(404).json({ message: 'Không tìm thấy đơn thuốc cho cuộc hẹn này.' });
            }

            res.status(200).json({
                date: prescription.appointment_id.appointment_date,
                reason: prescription.appointment_id.symptoms,
                doctor: prescription.appointment_id.doctor_id?.name || 'Không rõ',
                medicine: prescription.medicines.map(med => `${med.name} - ${med.quantity} ${med.unit} - ${med.dosage}`),
                notes: prescription.note || '',
                diagnosis: prescription.diagnosis ||''
            });
        }
        catch (error) {
            console.error('Lỗi khi lấy đơn thuốc:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy đơn thuốc.' });
        }
    }
}

module.exports = new PrescriptionController();
