
const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const MiddlewareController = require('../controller/MiddlewareController');

router.get('/getUser', userController.getUser);
router.delete('/:id',MiddlewareController.verifyTokenAndAdmin, userController.deleteUser)
module.exports = router;