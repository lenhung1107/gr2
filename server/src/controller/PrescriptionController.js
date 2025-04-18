const Prescription = require('../models/Prescription');

class PrescriptionController{
   async createPrescription (req, res) {
        try {
            const { appointment_id, medicines, note } = req.body;
    
            if (!appointment_id || !Array.isArray(medicines) || medicines.length === 0) {
                return res.status(400).json({ message: 'Thiếu dữ liệu hoặc danh sách thuốc rỗng' });
            }
    
            const newPrescription = new Prescription({
                appointment_id,
                medicines,
                note
            });
    
            await newPrescription.save();
    
            res.status(201).json({
                message: 'Đơn thuốc đã được tạo thành công',
                prescription: newPrescription
            });
        } catch (error) {
            console.error('Lỗi khi tạo đơn thuốc:', error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    };
}

module.exports= new PrescriptionController();
