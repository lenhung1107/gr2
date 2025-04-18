const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const Patient= new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'TestUser', // Tham chiếu đến bảng User
    },
     isForSomeone:{type: Boolean, default: false},
    name: { type: String, default: null }, // Chỉ có nếu là khám hộ
    phone: { type: String, default: null }, // Chỉ có nếu là khám hộ
    age: { type: Number, default: null }, // Chỉ có nếu là khám hộ
    patient_code: { type: String, required: true, unique: true } // Mã bệnh nhân
 });
 module.exports = mongoose.model('Patient', Patient);
