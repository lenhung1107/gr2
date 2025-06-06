require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connect success');
    } catch (error) {
        console.log('MongoDB connect failed:', error.message);
    }
}

module.exports = { connect };
