const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(reviewController.createReview);

module.exports = router;
