const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestOrderSchema = new Schema({
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
  pack_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Test',
      required: true
    }
  ],
  note: { type: String },
  status: {
    type: String,
    enum: ['Chờ kết quả', 'Hoàn tất', 'Đã xét nghiệm'],
    default: 'Chờ kết quả'
  },
  result_file: { type: String }
});

module.exports = mongoose.model('TestOrder', TestOrderSchema);
