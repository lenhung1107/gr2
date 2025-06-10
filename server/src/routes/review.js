const express = require('express');
const router = express.Router();
const reviewController = require('../controller/ReviewController');
router.post('/createReviews', reviewController.createReview);
router.get('/getReviews/:doctorId', reviewController.getAllReviews);
module.exports = router;