
const express = require('express');
const router = express.Router();

const patientController = require('../controller/PatientController');

router.get('/getPatientByDoctorID/:userId', patientController.getPatientByDoctorId);

module.exports = router;