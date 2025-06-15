const express = require('express');
const router = express.Router();
const multer = require('multer');
const AppointmentController = require("../controller/AppointmentController");
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'healthcare_uploads', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], 
  },
});

const upload = multer({ storage });
router.post('/bookAppointment', AppointmentController.bookAppointment);
router.get('/getAllAppoinment', AppointmentController.getAllAppointments);
router.delete('/cancelAppointment/:id', AppointmentController.cancelAppointment);
router.get('/getAppoinmentByUserId/:id', AppointmentController.getAppointmentsByUserId);
router.get('/getAppoinmentByDoctorId/:id', AppointmentController.getAppointmentsByDoctorId);
router.put('/confirmByAdmin/:id', AppointmentController.confirmAppointmentByAdmin);
router.put('/confirmByDoctor/:id', AppointmentController.confirmAppointmentByDoctor);
router.get('/getAppointmentsByPatientId/:patientId', AppointmentController.getAppointmentsByPatientId);
router.get('/getAllPackAppointment', AppointmentController.getAllPackAppointments);
router.patch('/updateStatus/:id', AppointmentController.confirmAppointmentByManagePack);
router.post('/uploadResult/:id', upload.single('resultFile'), AppointmentController.uploadFile);
router.put('/cancelByAdmin/:id', AppointmentController.cancelByAdmin);
module.exports = router;