const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkDateSchema = new Schema({
   dayWork:{type:String},
   hourWork: [{ type: String }],
    doctor_id: { type: Schema.Types.ObjectId, ref: 'Doctor' }// Danh sách bác sĩ thuộc chuyên khoa
});

module.exports = mongoose.model('WorkDate', WorkDateSchema);
