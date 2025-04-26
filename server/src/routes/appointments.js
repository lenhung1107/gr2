const express =require('express');
const router= express.Router();
const AppointmentController = require("../controller/AppointmentController");
const { route } = require('./doctors');

router.post('/bookAppointment', AppointmentController.bookAppointment);
router.get('/getAllAppoinment',AppointmentController.getAllAppointments);
router.delete('/cancelAppointment/:id',AppointmentController.cancelAppointment);
router.get('/getAppoinmentByUserId/:id',AppointmentController.getAppointmentsByUserId);
router.get('/getAppoinmentByDoctorId/:id',AppointmentController.getAppointmentsByDoctorId);
router.put('/confirmByAdmin/:id', AppointmentController.confirmAppointmentByAdmin);
router.put('/confirmByDoctor/:id', AppointmentController.confirmAppointmentByDoctor);
router.get('/getAppointmentsByPatientId/:patientId',AppointmentController.getAppointmentsByPatientId);
module.exports = router;