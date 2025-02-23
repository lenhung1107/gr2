
const express = require('express');
const router = express.Router();

const doctorController = require('../controller/PackController');

router.get('/', doctorController.getPack);

module.exports = router;