
const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');


router.get('/getUser', userController.getUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.delete('/deleteDoctor/:id', userController. deleteDoctor);
module.exports = router;