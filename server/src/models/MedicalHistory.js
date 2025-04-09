const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MedicalHistory = new Schema({
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: 'Patient', // Tham chiếu đến bảng User
    },
    diagnosis: { type: String },
    doctor_note: { type: String },
    prescription: {
        medicine: { type: String }, 
        remind: { type: String },
        instructions: { type: String }, //
    }
});
module.exports = mongoose.model('MedicalHistory', MedicalHistory);
