const express = require('express')
const router= express.Router();
const doctorDetail = require('../controller/DoctorDetailController')
router.get('/:id',doctorDetail.getDoctor);

module.exports = router;