
const express = require('express');
const router = express.Router();

const hotnewController = require('../controller/HotNewController');

router.get('/', hotnewController.getNew);

module.exports = router;