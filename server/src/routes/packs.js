
const express = require('express');
const router = express.Router();

const packController = require('../controller/PackController');

router.get('/getAll', packController.getPack);
router.get('/getById/:id',packController.getPackById);
router.put('/updatePack/:id', packController.updatePack);
router.delete('/deletePack/:id',packController.deletePack);
router.post('/addPack', packController.addPack);
module.exports = router;