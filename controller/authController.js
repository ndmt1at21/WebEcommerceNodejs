const catchAsync = require('../ultilities/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../ultilities/appError');
const util = require('util');

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.password,
    email: req.body.email
  });

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN
  });

  res.status(200).json({
    user,
    token
  });

  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please input email and password', 401));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new AppError('Incorrect user or password'));
  }

  res.status(200).json({
    status: 'success',
    user
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Beaber')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  }

  // auth token
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // check if user deleted
  // decoded { id : __}
  const user = await User.findById(decoded.id);
  if (!user) {
    return next('User has been deleted or dis-active');
  }

  // check if user change password after jwt send
  // iat: issuse at (time in second, from 1.1.1970)
  if (user.isChangedPasswordAfter(decoded.iat)) {
    return next('Password was changed. Please login again.');
  }

  req.user = user;
  res.locals.user = user;
  next();
});
