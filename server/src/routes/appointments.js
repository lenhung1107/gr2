const express =require('express');
const router= express.Router();
const AppointmentController = require("../controller/AppointmentController");

router.post('/bookAppointment', AppointmentController.bookAppointment);
router.get('/getAllAppoinment',AppointmentController.getAllAppointments);
router.get('/getAppoinmentByUserId/:id',AppointmentController.getAppointmentsByUserId);
router.get('/getAppoinmentByDoctorId/:id',AppointmentController.getAppointmentsByDoctorId);
router.put('/confirmByAdmin/:id', AppointmentController.confirmAppointmentByAdmin);
router.put('/confirmByDoctor/:id', AppointmentController.confirmAppointmentByDoctor);
module.exports = router;