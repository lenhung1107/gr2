const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
class DoctorController {
  async getDoctor(req, res) {
    try {
      const doctors = await Doctor.find({})
        .populate("specialty", "name")
        .lean();
      const updatedDoctors = await Promise.all(
        doctors.map(async (doc) => {
          const count = await Appointment.countDocuments({
            doctor_id: doc._id,
            status: "Đã khám",
          });

          return {
            ...doc,
            specialty: doc.specialty?.name || null,
            appointments: count,
          };
        })
      );

      res.json(updatedDoctors);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "error!" });
    }
  }
  async getTopDoctors(req, res) {
    try {
      const topDoctors = await Doctor.find({ rating: { $gte: 4 } })
        .populate("specialty", "name")
        .lean();

      const updatedTopDoctors = await Promise.all(
        topDoctors.map(async (doc) => {
          const count = await Appointment.countDocuments({
            doctor_id: doc._id,
            status: "Đã khám",
          });

          return {
            ...doc,
            specialty: doc.specialty?.name || null,
            appointments: count,
          };
        })
      );

      res.json(updatedTopDoctors);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "error!" });
    }
  }
}

module.exports = new DoctorController();
