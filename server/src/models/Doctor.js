const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doctor = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'TestUser', 
            required: true
        },
        name: { type: String, required: true },
        specialty: {
            type: Schema.Types.ObjectId,
            ref: 'Specialty',
        },
        bio: { type: String },
        rating: { type: Number, min: 0, max: 5,default: 0 },
        appointments: { type: Number },
        image: { type: String },
        price: { type: String }

    }
);

module.exports = mongoose.model('Doctor', Doctor);
