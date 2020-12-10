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

exports.getUserByID = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  await User.findOneAndUpdate(req.body);

  res.status(200).json({
    status: 'success'
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate({ active: false });

  res.status(204).json({
    status: 'success'
  });
});
