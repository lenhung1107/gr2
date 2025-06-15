const Appointment = require('../models/Appointment');
const TestOrder = require('../models/TestOrder');
class TestOrderController {
  async createTestOrder(req, res) {
    try {
      const { appointment_id, doctor_id, pack_ids, note } = req.body;
      if (!Array.isArray(pack_ids) || pack_ids.length === 0) {
        return res.status(400).json({ message: 'Phải chọn ít nhất một gói xét nghiệm' });
      }
      const existing = await TestOrder.findOne({ appointment_id });
      if (existing) {
        return res.status(400).json({ message: 'Đã tồn tại chỉ định xét nghiệm cho cuộc hẹn này' });
      }
      const newOrder = new TestOrder({
        appointment_id,
        doctor_id,
        pack_ids,
        status: 'Chờ kết quả',
        note
      });
      await newOrder.save();
      await Appointment.findByIdAndUpdate(appointment_id, { status: 'Chờ kết quả xét nghiệm' });
      res.status(201).json({ message: 'Tạo chỉ định xét nghiệm thành công', data: newOrder });
    }
    catch (error) {
      console.error('Lỗi chỉ định xét nghiệm:', error);
      res.status(500).json({ message: 'Lỗi chỉ định xét nghiệm!', error: error.message });
    }
  }
  async getAllTestOrder(req, res) {
    try {
      const testOrders = await TestOrder.find()
        .populate({
          path: 'appointment_id',
          populate: [
            {
              path: 'patient_id',
              populate: {
                path: 'user_id',
                model: 'TestUser',
                select: 'name phone age'
              }
            },
          ]
        })
        .populate({
          path: 'doctor_id',
          model: 'TestUser', 
          select: 'name'
        })
        .populate({
          path: 'pack_ids',
          select: 'name'
        });
        
      const formatted = testOrders.map(order => {
        const appointment = order.appointment_id;
        const patient = appointment?.patient_id;
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
          _id: order._id,
          date: appointment?.appointment_date,
          hour: appointment?.appointment_time,
          patientName,
          patientPhone,
          patientAge,
          doctorName: order.doctor_id?.name || "Không rõ", // Tên từ TestUser    
          packNames:order.pack_ids.map(pack => pack.name).join(', ') || "Không rõ",
          status: order.status, 
          result_file: order.result_file,
          note: order.note
        };
      });
      res.status(200).json(formatted);

    } catch (err) {
      console.error('Lỗi khi lấy test orders:', err);
      res.status(500).json({ error: 'Lỗi server', message: err.message });
    }
  }
  async confirmTestOrder(req, res) {
    try {
      const updatedTestOrder = await TestOrder.findByIdAndUpdate(
        req.params.id,
        { status: 'Hoàn tất' },
        { new: true }
      );

      if (!updatedTestOrder) {
        return res.status(404).json({ message: 'Không tìm thấy TestOrder' });
      }

      res.json({ message: 'Đã cập nhật trạng thái thành công', data: updatedTestOrder });
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
  async uploadFile(req, res) {
    try {
      const testOrderId = req.params.id;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'Không có file được upload.' });
      }
      const fileUrl = file.path;

      const updatedTestOrder = await TestOrder.findByIdAndUpdate(
        testOrderId,
        {
          result_file: fileUrl,
          status: 'Đã xét nghiệm',
        },
        { new: true }
      );
      if (!updatedTestOrder) {
        return res.status(404).json({ message: 'Không tìm thấy TestOrder.' });
      }

      const appointmentId = updatedTestOrder.appointment_id;

      await Appointment.findByIdAndUpdate(
        appointmentId,
        {
          result_file: fileUrl,
          status: 'Có kết quả xét nghiệm',
        }
      );
      return res.status(200).json({
        message: 'Upload và cập nhật thành công!',
        fileUrl,
      });
    } catch (error) {
      console.error("Lỗi tải file:", error);
      res.status(500).json({ message: "Lỗi tải file!", error: error.message });
    }
  }
}

module.exports = new TestOrderController();