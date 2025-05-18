
const express = require('express');
const router = express.Router();
const TestController= require('../controller/TestController');
router.get('/getAll', TestController.getAllTest);
router.post('/create', TestController.createTest);
router.put('/update/:id',TestController.updateTest);
router.delete('/delete/:id',TestController.deleteTest);
module.exports = router;