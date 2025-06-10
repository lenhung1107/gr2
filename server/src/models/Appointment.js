const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = new Schema({
  appointment_type: { type: String, enum: ["doctor", "pack"], required: true },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "TestUser", 
    required: true,
  },
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: "Patient", 
    required: true,
  },
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: "Doctor", 
  },
  pack_id: {
    type: Schema.Types.ObjectId,
    ref: "Pack",
  },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true }, 
  status: {
    type: String,
    enum: [
      "Đang chờ xác nhận",
      "Đang khám",
      "Chờ kết quả xét nghiệm",
      "Có kết quả xét nghiệm", 
      "Đã khám",
      "Đã hủy",
    ],
    default: "Đang chờ xác nhận",
  },
  symptoms: { type: String }, 
  result_file: { type: String }, 
  review: { type: Boolean, default: false },
});

module.exports = mongoose.model("Appointment", Appointment);
