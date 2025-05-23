
const express = require('express');
const router = express.Router();

const userController = require('../controller/UserUseController');


router.get('/getUser/:id', userController.getUser);
router.put('/editUser/:id',userController.editUser);
module.exports = router;