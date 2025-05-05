const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestOrder = new Schema({
  appointment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  pack_id: {
    type: Schema.Types.ObjectId,
    ref: 'Pack',
    required: true
  },
  note: { type: String },
  status: {
    type: String,
    enum: ['Chờ kết quả','Hoàn tất', 'Đã xét nghiệm'],
    default: 'Chờ kết quả'
  },
  result_file: { type: String } // Thêm dòng này
});

module.exports = mongoose.model('TestOrder', TestOrder);
