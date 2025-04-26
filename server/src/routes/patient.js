
const express = require('express');
const router = express.Router();

const patientController = require('../controller/PatientController');

router.get('/getPatientByDoctorID/:userId', patientController.getPatientByDoctorId);
router.get('/getAllPatient', patientController.getAllPatient);
router.get('/getPatientByUserID/:userId', patientController.getPatientByUserId);
module.exports = router;