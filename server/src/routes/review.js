const express = require('express');
const router = express.Router();
const reviewController = require('../controller/ReviewController');
router.post('/createReviews', reviewController.createReview);
router.get('/getReviews/:doctorId', reviewController.getAllReviews);
router.get('/getReviewsByPack/:packId', reviewController.getPackReviews);
module.exports = router;