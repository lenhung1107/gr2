const Review = require("../models/Review");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

class ReviewController {
  async createReview(req, res) {
    try {
      const {
        appointment_id,
        patient_id,
        doctor_id,
        pack_id,
        rating,
        comment,
      } = req.body;
      console.log("patient_id", req.patient_id);
      const appointment = await Appointment.findById(appointment_id);
      if (!appointment || appointment.status !== "Đã khám") {
        return res
          .status(400)
          .json({ message: "Bạn chỉ có thể đánh giá sau khi đã khám" });
      }
      const existed = await Review.findOne({ appointment_id });
      if (existed) {
        return res
          .status(400)
          .json({ message: "Bạn đã đánh giá bác sĩ này cho cuộc hẹn này" });
      }
      const review = new Review({
        appointment_id,
        patient_id,
        doctor_id,
        pack_id,
        rating,
        comment,
      });
      await review.save();
      if (doctor_id) {
        const reviews = await Review.find({ doctor_id });
        const avgRating =
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Doctor.findByIdAndUpdate(doctor_id, {
          rating: avgRating.toFixed(1),
        });
      }
      if (pack_id) {
        const reviews = await Review.find({ pack_id });
        const avgRating =
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Pack.findByIdAndUpdate(pack_id, {
          rating: avgRating.toFixed(1),
        });
      }
      res.status(201).json({ message: "Đánh giá thành công", review });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }
  async getAllReviews(req, res) {
    try {
      const { doctorId } = req.params;
      const reviews = await Review.find({ doctor_id: doctorId })
        .populate("patient_id", "name")
        .sort({ createdAt: -1 });

      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }
  async getPackReviews(req, res) {
    try {
      const { packId } = req.params;
      const reviews = await Review.find({ pack_id: packId })
        .populate("patient_id", "name")
        .sort({ createdAt: -1 });

      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  }
}
module.exports = new ReviewController();
