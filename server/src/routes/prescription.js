const express = require('express');
const router = express.Router();
const prescriptionController = require('../controller/PrescriptionController');
router.post('/createPrescription',prescriptionController.createPrescription)
module.exports = router;