const catchAsync = require('../ultilities/catchAsync');
const Review = require('./../models/reviewModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    reviews
  });

  next();
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  res.status(200).json({
    review
  });
  next();
});
