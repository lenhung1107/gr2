const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const TestOrder = new Schema({
    appointment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
      },
      doctor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor', // hoặc 'Doctor' tùy bạn
        required: true
      },
      pack_id: { type: Schema.Types.ObjectId, ref: 'Pack', required: true },
      note: { type: String }, // Danh sách gói xét nghiệm chỉ định
      status: {
        type: String,
        enum: ['Chờ kết quả', 'Hoàn tất'],
        default: 'Chờ kết quả'
      }
})
module.exports= mongoose.model('TestOrder', TestOrder);