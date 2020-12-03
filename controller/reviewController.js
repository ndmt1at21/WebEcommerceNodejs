const catchAsync = require('../ultilities/catchAsync');
const Review = require('./../models/reviewModel');

exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = Review.find();

  res.status(200).json({
    reviews
  });

  next();
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = Review.create(req.body);

  res.status(200).json({
    review
  });
  next();
});
