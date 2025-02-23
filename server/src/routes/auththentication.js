const express = require('express')
const router= express.Router();
const AuthenticationController= require('../controller/AuthenticationController')
const MiddlewareController=require("../controller/MiddlewareController")
router.post('/signup',AuthenticationController.register)
router.post('/login',AuthenticationController.login)
router.post('/refresh',AuthenticationController.requestRefreshToken)
router.post('/logout',MiddlewareController.verifyToken,AuthenticationController.logout)
module.exports = router;
