const express = require('express');
const router=express.Router();
const WorkdateController= require('../controller/WorkdateController');

router.post('/registerSchedule', WorkdateController.registerSchedule);
router.get("/schedulesGetByUserID/:userId",  WorkdateController.getSchedulebyUserID);
router.get("/schedulesGetByDoctorID/:doctorId",  WorkdateController.getSchedulebyDoctorID);
module.exports=router;