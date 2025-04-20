const express = require('express');
const router = express.Router();
const prescriptionController = require('../controller/PrescriptionController');
router.post('/createPrescription',prescriptionController.createPrescription);
router.get('/getPrescriptionByAppointmentId/:id',prescriptionController.getPrescriptionByAppoinmentId);
module.exports = router;