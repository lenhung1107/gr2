const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    appointment_id: {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    medicines: [
        {
            name: String,
            unit: String,
            quantity: Number,
            dosage: String,
        }
    ],
    note: {type: String},
    diagnosis:{type: String}
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
