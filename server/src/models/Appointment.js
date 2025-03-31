const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointment = new Schema({
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: 'Patient', // Tham chiếu đến bảng Patient
        required: true
    },
    doctor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor', // Tham chiếu đến bảng Doctor
        required: true
    },
    appointment_date: { type: Date, required: true }, // Ngày khám
    appointment_time: { type: String, required: true }, // Giờ khám
    status: { type: String, default: 'Pending' }, // Trạng thái cuộc hẹn
    symptoms: { type: String }, // Triệu chứng
    doctor_note: { type: String } // Ghi chú của bác sĩ
});

module.exports = mongoose.model('Appointment', Appointment);
