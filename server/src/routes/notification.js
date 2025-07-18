const express = require('express');
const router = express.Router();

const notificationController = require('../controller/NotificationController');

router.post('/subscribe', notificationController.subscribe);
router.get("/:userId", notificationController.getUserNotifications);
module.exports = router;