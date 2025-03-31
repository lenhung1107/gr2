const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const Patient= new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'TestUser', // Tham chiếu đến bảng User
        required: true
    },
    patient_code: { type: String , unique: true, required: true}
 });
 module.exports = mongoose.model('Patient', Patient);
