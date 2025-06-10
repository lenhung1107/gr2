const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    appointment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    rating: { 
        type: Number,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', Review);
