const express = require('express');
const router = express.Router();

const statisticsController = require('../controller/StatisticsController');

router.get('/appointments', statisticsController.getAppointments);

module.exports = router;