
const express = require('express');
const router = express.Router();

const packController = require('../controller/PackController');

router.get('/getAll', packController.getPack);
router.get('/getById/:id',packController.getPackById);
module.exports = router;