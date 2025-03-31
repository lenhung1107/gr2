const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doctor = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'TestUser', // Tham chiếu đến bảng User
            required: true
        },
        name:{type:String, required:true},
        specialty: { type: String },
        bio: { type: String },
        rating: { type: Number, min: 0, max: 5 },
        appointments: { type: Number },
        image: { type: String },
        price: { type: String }
       
    }
);

module.exports = mongoose.model('Doctor', Doctor);
