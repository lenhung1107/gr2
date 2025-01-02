
const express = require('express');
const router = express.Router();

const doctorController = require('../controller/DoctorController');

router.get('/', doctorController.getDoctor);

module.exports = router;