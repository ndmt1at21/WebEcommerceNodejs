const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController');
const express = require('express');

// merge params for get params from router before
const router = express.Router({ mergeParams: true });

// router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getReviews)
  .post(authController.protect, reviewController.createReview)
  .delete(reviewController.deleteReview);

module.exports = router;
