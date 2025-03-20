const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpecialtySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctor' }] // Danh sách bác sĩ thuộc chuyên khoa
});

module.exports = mongoose.model('Specialty', SpecialtySchema);
