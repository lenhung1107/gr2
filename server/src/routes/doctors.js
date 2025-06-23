
const express = require('express');
const router = express.Router();

const doctorController = require('../controller/DoctorController');

router.get('/', doctorController.getDoctor);
router.get('/top', doctorController.getTopDoctors);
module.exports = router;