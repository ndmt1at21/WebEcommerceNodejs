const Racket = require('./../models/racketModel');
const User = require('./../models/racketModel');
const catchAsync = require('./../ultilities/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('index', {
    title: 'abcxyz'
  });
});
