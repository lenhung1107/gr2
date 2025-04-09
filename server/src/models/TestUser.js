const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TestUser = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        age: { type: Number },
        phone: { type: String },
        address: { type: String },
        email: { type: String },
        gender: { type: String },
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        admin: {
            type: Boolean,
            default: false
        }, 
        role:{type: Number, default:1}
    }
);
module.exports = mongoose.model('TestUser', TestUser);
                                                       