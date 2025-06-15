const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const Patient= new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'TestUser', 
    },
    doctor_id: {
        type: Schema.Types.ObjectId,
        ref:'Doctor',
    },
    isForSomeone:{type: Boolean, default: false},
    name: { type: String, default: null }, 
    phone: { type: String, default: null }, 
    age: { type: Number, default: null }, 
    patient_code: { type: String, required: true, unique: true }
 });
 module.exports = mongoose.model('Patient', Patient);
