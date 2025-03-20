const express = require('express');
const router = express.Router();
const SpecialtyController = require('../controller/SpecialtyController');

// Định nghĩa route
router.get('/', SpecialtyController.getAllSpecialties);
// API lấy chi tiết một chuyên khoa theo ID
router.get('/:id', SpecialtyController.getSpecialtyById);
module.exports = router;
