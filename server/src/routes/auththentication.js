const express = require('express')
const router= express.Router();
const AuthenticationController= require('../controller/AuthenticationController')
router.post('/signup',AuthenticationController.register)
router.post('/login',AuthenticationController.login)
router.post('/refresh',AuthenticationController.requestRefreshToken)
router.post('/logout',AuthenticationController.logout)
module.exports = router;
