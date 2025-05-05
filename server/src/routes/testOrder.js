const express = require('express');
const router = express.Router();
const TestOrderController = require('../controller/TestOrderController');

// Định nghĩa route
router.post('/create', TestOrderController.createTestOrder);
router.get('/getAll',TestOrderController.getAllTestOrder );
// API lấy chi tiết một chuyên khoa theo ID
module.exports = router;
