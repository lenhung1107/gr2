const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Pack = require("../models/Pack");
const Prescription = require("../models/Prescription");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const sendNotificationToUser = require("../utils/sendNotification");

class AppointmentController {
  async uploadFile(req, res) {
    try {
      const appointmentId = req.params.id;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "Không có tệp được tải lên." });
      }
      const fileUrl = file.path;
      await Appointment.updateOne(
        { _id: appointmentId },
        { result_file: fileUrl }
      );
      res.status(200).json({ message: "File tải lên thành công!", fileUrl });
    } catch (error) {
      console.error("Lỗi tải file:", error);
      res.status(500).json({ message: "Lỗi tải file!", error: error.message });
    }
  }
  async bookAppointment(req, res) {
    try {
      let {
        user_id,
        service_id,
        appointment_type,
        appointment_date,
        appointment_time,
        symptoms,
        isForSomeoneElse,
        patient_name,
        patient_age,
        patient_phone,
      } = req.body;
      user_id = new mongoose.Types.ObjectId(user_id);

      let patient;

      if (isForSomeoneElse) {
        patient = await Patient.findOne({
          user_id,
          name: patient_name,
          phone: patient_phone,
          isForSomeone: true,
        });

        if (!patient) {
          patient = new Patient({
            user_id,
            isForSomeone: true,
            name: patient_name,
            age: patient_age,
            phone: patient_phone,
            patient_code: `PAT-${Date.now()}`,
          });
          if (appointment_type === "doctor") {
            patient.doctor_id = service_id;
          }
          await patient.save();
        }
      } else {
        patient = await Patient.findOne({ user_id, isForSomeone: false });

        if (!patient) {
          patient = new Patient({
            user_id,
            isForSomeone: false,
            patient_code: `PAT-${Date.now()}`,
          });
          if (appointment_type === "doctor") {
            patient.doctor_id = service_id;
          }
          await patient.save();
        }
      }

      const newAppointment = new Appointment({
        user_id,
        patient_id: patient._id,
        appointment_type,
        appointment_date,
        appointment_time,
        symptoms,
        status: "Đang chờ xác nhận",
      });
      if (appointment_type === "doctor") {
        newAppointment.doctor_id = service_id;
      } else if (appointment_type === "pack") {
        newAppointment.pack_id = service_id;
      }
      await newAppointment.save();

      res
        .status(201)
        .json({ message: "Đặt lịch thành công!", appointment: newAppointment });
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      res.status(500).json({ message: "Lỗi đặt lịch!", error: error.message });
    }
  }
  async cancelAppointment(req, res) {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ message: "Không tìm thấy cuộc hẹn." });
      }
      const patientId = appointment.patient_id;
      appointment.status = "Đã hủy";
      await appointment.save();
      const otherAppointments = await Appointment.find({
        patient_id: patientId,
        _id: { $ne: new mongoose.Types.ObjectId(id) },
      });
      const patient = await Patient.findById(patientId);
      if (otherAppointments.length === 0 && patient?.isForSomeone) {
        await Patient.findByIdAndDelete(patientId);
      }
      return res.status(200).json({ message: "Đã hủy cuộc hẹn thành công." });
    } catch (error) {
      console.error("Lỗi BE:", error);
      return res.status(500).json({ message: "Đã xảy ra lỗi server." });
    }
  }
  async cancelByAdmin(req, res) {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
      }
      appointment.status = "Đã hủy";
      appointment.cancel_reason = req.body.reason;
      await appointment.save();
      await sendNotificationToUser(appointment.user_id, {
        title: "Yêu cầu đặt khám của bạn bị hủy",
        body: `Lịch khám của bạn đã bị hủy!`,
        icon: "/pwa-192x192.png",
      });
      res.status(200).json({ message: "Hủy cuộc hẹn thành công", appointment });
    } catch (error) {
      console.error("Lỗi khi hủy lịch hẹn:", error);
      res.status(500).json({ message: "Hủy cuộc hẹn thất bại" });
    }
  }
  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.find()
        .populate({
          path: "patient_id",
          populate: {
            path: "user_id",
            model: "TestUser",
            select: "name age phone",
          },
        })
        .populate({
          path: "doctor_id",
          select: "name",
        })
        .populate({
          path: "pack_id",
          select: "name",
        });

      const formattedAppointments = appointments.map((appt) => {
        const patient = appt.patient_id;
        const isForSomeone = patient?.isForSomeone ?? true;
        const patientName = isForSomeone
          ? patient?.name || "Đã xoá"
          : patient?.user_id?.name || "Đã xoá";

        const patientPhone = isForSomeone
          ? patient?.phone || "Không có"
          : patient?.user_id?.phone || "Không có";

        const patientAge = isForSomeone
          ? patient?.age || "Không rõ"
          : patient?.user_id?.age || "Không rõ";
        let serviceName = "";
        if (appt.appointment_type === "doctor") {
          serviceName = appt.doctor_id?.name || "Đã xoá bác sĩ";
        } else if (appt.appointment_type === "pack") {
          serviceName = appt.pack_id?.name || "Đã xoá gói khám";
        }
        return {
          _id: appt._id,
          name: patientName,
          phone: patientPhone,
          age: patientAge,
          date: appt.appointment_date,
          hour: appt.appointment_time,
          service: serviceName,
          symptoms: appt.symptoms,
          status: appt.status,
        };
      });
      res.status(200).json(formattedAppointments);
    } catch (err) {
      console.log("Lỗi lấy danh sách cuộc hẹn:", err);
      res.status(500).json({ message: "Lỗi server", err: err.message });
    }
  }
  async getAppointmentsByUserId(req, res) {
    try {
      const userId = req.params.id;
      const appointments = await Appointment.find({ user_id: userId })
        .populate({
          path: "patient_id",
          populate: {
            path: "user_id",
            model: "TestUser",
            select: "name age phone",
          },
        })
        .populate({
          path: "doctor_id",
          select: "name",
        })
        .populate({
          path: "pack_id",
          select: "name",
        });
      const formattedAppointments = appointments.map((appt) => {
        const patient = appt.patient_id;

        const isForSomeone = patient?.isForSomeone ?? true;
        const patientName = isForSomeone
          ? patient?.name || "Đã xoá"
          : patient?.user_id?.name || "Đã xoá";

        const patientPhone = isForSomeone
          ? patient?.phone || "Không có"
          : patient?.user_id?.phone || "Không có";

        const patientAge = isForSomeone
          ? patient?.age || "Không rõ"
          : patient?.user_id?.age || "Không rõ";
        let serviceName = "";
        if (appt.appointment_type === "doctor") {
          serviceName = appt.doctor_id?.name || "Đã xoá bác sĩ";
        } else if (appt.appointment_type === "pack") {
          serviceName = appt.pack_id?.name || "Đã xoá gói khám";
        }
        return {
          _id: appt._id,
          isForSomeone: isForSomeone,
          name: patientName,
          phone: patientPhone,
          age: patientAge,
          date: appt.appointment_date,
          hour: appt.appointment_time,
          service: serviceName,
          symptoms: appt.symptoms,
          status: appt.status,
          patient_id: appt.patient_id._id,
          doctor_id:
            appt.appointment_type === "doctor"
              ? appt.doctor_id?._id
              : undefined,
          pack_id:
            appt.appointment_type === "pack" ? appt.pack_id?._id : undefined,
        };
      });
      res.status(200).json(formattedAppointments);
    } catch (err) {
      console.log("Lỗi lấy danh sách cuộc hẹn:", err);
      res.status(500).json({ message: "Lỗi server", err: err.message });
    }
  }
  async confirmAppointmentByAdmin(req, res) {
    const { id } = req.params;

    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status: "Đang chờ khám" },
        { new: true }
      );

      if (!updatedAppointment) {
        return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
      }
      await sendNotificationToUser(updatedAppointment.user_id, {
        title: "Yêu cầu đặt khám của bạn đã được xác nhận",
        body: `Lịch khám của bạn đã được xác nhận!`,
        icon: "/pwa-192x192.png",
      });
      res.json({
        message: "Đã xác nhận lịch hẹn thành công",
        appointment: updatedAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
  async getAppointmentsByDoctorId(req, res) {
    try {
      const userId = req.params.id;
      const doctor = await Doctor.findOne({ user_id: new ObjectId(userId) });
      if (!doctor) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy bác sĩ với userId này" });
      }
      const appointments = await Appointment.find({ doctor_id: doctor._id })
        .populate({
          path: "patient_id",
          populate: {
            path: "user_id",
            model: "TestUser",
            select: "name age phone",
          },
        })
        .populate({
          path: "doctor_id",
          select: "name",
        });
      const prescriptionList = await Prescription.find({
        appointment_id: { $in: appointments.map((a) => a._id) },
      }).select("appointment_id");

      const appointmentIdsWithPrescription = new Set(
        prescriptionList.map((p) => p.appointment_id.toString())
      );
      const formattedAppointments = appointments.map((appt) => {
        const patient = appt.patient_id;
        const isForSomeone = patient?.isForSomeone ?? true;
        const patientName = isForSomeone
          ? patient?.name || "Đã xoá"
          : patient?.user_id?.name || "Đã xoá";

        const patientPhone = isForSomeone
          ? patient?.phone || "Không có"
          : patient?.user_id?.phone || "Không có";

        const patientAge = isForSomeone
          ? patient?.age || "Không rõ"
          : patient?.user_id?.age || "Không rõ";
        return {
          _id: appt._id,
          isForSomeone: isForSomeone,
          name: patientName,
          phone: patientPhone,
          age: patientAge,
          result_file: appt.result_file,
          date: appt.appointment_date,
          hour: appt.appointment_time,
          doctor: appt.doctor_id?.name,
          symptoms: appt.symptoms,
          status: appt.status,
          hasPrescription: appointmentIdsWithPrescription.has(
            appt._id.toString()
          ),
        };
      });
      res.status(200).json(formattedAppointments);
    } catch (err) {
      console.log("Lỗi lấy danh sách cuộc hẹn:", err);
      res.status(500).json({ message: "Lỗi server", err: err.message });
    }
  }
  async confirmAppointmentByDoctor(req, res) {
    const { id } = req.params;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status: "Đang khám" },
        { new: true }
      );

      if (!updatedAppointment) {
        return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
      }
      await sendNotificationToUser(updatedAppointment.user_id, {
        title: "Bác sĩ đã tiếp nhận khám",
        body: "Bác sĩ đã tiếp nhận cuộc hẹn của bạn. Vui lòng chờ khám.",
        icon: "/pwa-192x192.png",
      });
      res.json({
        message: "Xác nhận bệnh nhân đang khám",
        appointment: updatedAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
  async getAppointmentsByPatientId(req, res) {
    const { patientId } = req.params;
    try {
      const appointments = await Appointment.find({
        patient_id: patientId,
        status: "Đã khám",
      })
        .populate({
          path: "doctor_id",
          select: "name specialty",
        })
        .populate({
          path: "pack_id",
          select: "name",
        })
        .populate({
          path: "patient_id",
          select: "name",
        });

      const result = await Promise.all(
        appointments.map(async (appointment) => {
          const prescription = await Prescription.findOne({
            appointment_id: appointment._id,
          });
          let serviceName = "";
          if (appointment.appointment_type === "doctor") {
            serviceName = appointment.doctor_id?.name || "Đã xoá bác sĩ";
          } else if (appointment.appointment_type === "pack") {
            serviceName = appointment.pack_id?.name || "Đã xoá gói khám";
          }

          return {
            date: appointment.appointment_date,
            hour: appointment.appointment_time,
            service: serviceName,
            symptoms: appointment.symptoms,
            diagnosis: prescription?.diagnosis || "",
            note: prescription?.note || "",
            prescription: prescription?.medicines || [],
          };
        })
      );

      res.status(200).json(result);
    } catch (err) {
      console.log("Lỗi lấy danh sách cuộc hẹn theo bệnh nhân:", err);
      res.status(500).json({ message: "Lỗi server", err: err.message });
    }
  }

  async getAllPackAppointments(req, res) {
    try {
      const appointments = await Appointment.find({ appointment_type: "pack" })
        .populate({
          path: "patient_id",
          populate: {
            path: "user_id",
            model: "TestUser",
            select: "name age phone",
          },
        })
        .populate({
          path: "pack_id",
          select: "name",
        });
      const formattedAppointments = appointments.map((appt) => {
        const patient = appt.patient_id;
        const isForSomeone = patient?.isForSomeone ?? true;
        const patientName = isForSomeone
          ? patient?.name || "Đã xoá"
          : patient?.user_id?.name || "Đã xoá";

        const patientPhone = isForSomeone
          ? patient?.phone || "Không có"
          : patient?.user_id?.phone || "Không có";

        const patientAge = isForSomeone
          ? patient?.age || "Không rõ"
          : patient?.user_id?.age || "Không rõ";

        const serviceName = appt.pack_id?.name || "Đã xoá gói khám";

        return {
          _id: appt._id,
          name: patientName,
          phone: patientPhone,
          age: patientAge,
          date: appt.appointment_date,
          hour: appt.appointment_time,
          service: serviceName,
          symptoms: appt.symptoms,
          status: appt.status,
          result_file: appt.result_file,
        };
      });

      res.status(200).json(formattedAppointments);
    } catch (err) {
      console.error("Lỗi lấy danh sách cuộc hẹn bằng gói khám:", err);
      res.status(500).json({ message: "Lỗi server", err: err.message });
    }
  }
  async confirmAppointmentByManagePack(req, res) {
    try {
      const appointmentId = req.params.id;
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status: "Đã khám" },
        { new: true }
      );
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
      }
      if (updatedAppointment.doctor_id) {
        await Doctor.findByIdAndUpdate(updatedAppointment.doctor_id, {
          $inc: { appointments: 1 },
        });
      }
      await sendNotificationToUser(updatedAppointment.user_id, {
        title: "Lịch khám đã hoàn tất",
        body: "Cuộc hẹn khám bệnh của bạn đã được hoàn tất.",
        icon: "/pwa-192x192.png",
      });
      res.json({
        message: "Cập nhật thành công",
        appointment: updatedAppointment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

module.exports = new AppointmentController();
