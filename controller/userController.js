const Racket = require('./../models/racketModel');
const User = require('./../models/racketModel');
const catchAsync = require('./../ultilities/catchAsync');

exports.getLogin = catchAsync(async (req, res, next) => {
  // res.status(200).render('account');
  next();
});

exports.getAccount = catchAsync(async (req, res, next) => {
  // res.status(200).render('account');
  next();
});
