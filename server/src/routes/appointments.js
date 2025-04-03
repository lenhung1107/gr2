const express =require('express');
const router= express.Router();
const AppointmentController = require("../controller/AppointmentController");

router.post('/', AppointmentController.bookAppointment);
module.exports = router;