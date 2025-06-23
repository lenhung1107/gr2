const Doctor = require("../models/Doctor");

class DoctorController {
  async getDoctor(req, res) {
    try {
      const doctors = await Doctor.find({})
        .populate("specialty", "name")
        .lean();
      const updatedDoctors = doctors.map((doc) => ({
        ...doc,
        specialty: doc.specialty?.name || null,
      }));
      res.json(updatedDoctors);
    } catch (err) {
      res.status(400).json({ error: "error!" });
    }
  }
  async getTopDoctors(req, res) {
    try {
      const topDoctors = await Doctor.find({ rating: { $gte: 4 } })
        .populate("specialty", "name")
        .lean();

      const updatedTopDoctors = topDoctors.map((doc) => ({
        ...doc,
        specialty: doc.specialty?.name || null,
      }));

      res.json(updatedTopDoctors);
    } catch (err) {
      res.status(400).json({ error: "error!" });
    }
  }
}

module.exports = new DoctorController();
