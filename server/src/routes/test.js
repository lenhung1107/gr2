
const express = require('express');
const router = express.Router();
const TestController= require('../controller/TestController');
router.get('/getAll', TestController.getAllTest);
router.post('/create', TestController.createTest);
module.exports = router;