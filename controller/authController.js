const catchAsync = require('../ultilities/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../ultilities/appError');
const util = require('util');
const nodemailer = require('nodemailer');

const signSendJWT = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN
  });

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 60),
    httpOnly: true
  });

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
    passwordConfirm: req.body.password,
    email: req.body.email
  });

  signSendJWT(user, res);
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check email, password is empty?
  if (!email || !password) {
    return next(new AppError('Please input email and password', 401));
  }

  // Find user in database
  const user = await User.findOne({ email }).select('+password');

  // Check input password and user's password
  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new AppError('Incorrect user or password'));
  }

  // Create JWT token and send to user
  signSendJWT(user, res);
});

exports.logout = catchAsync(async (req, res, next) => {});

exports.protect = catchAsync(async (req, res, next) => {
  // get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Beaber')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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

  // for fucntion after can access user
  req.user = user;
  res.locals.user = user;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // get token
  let token = req.cookies.jwt;
  if (token) {
    // auth token
    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    // check if user deleted
    // decoded { id : __}
    const user = await User.findById(decoded.id);
    if (!user) {
      return next();
    }

    // check if user change password after jwt send
    // iat: issuse at (time in second, from 1.1.1970)
    if (user.isChangedPasswordAfter(decoded.iat)) {
      return next();
    }

    // for fucntion after can access user
    req.user = user;
    res.locals.user = user;
  }
  next();
});

exports.restrictTo = function (...roles) {
  // req.user from before middleware (protect)
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`You don't have permission for this action`));
    }
    next();
  };
};

// create token save in database, send email with token
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //   // get email from body req
  //   if (!req.body.email) {
  //     return next(new AppError('Please input your email to reset password'), 400);
  //   }
  //   const email = req.body.email;
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     return next('Email is not match any user', 400);
  //   }
  //   console.log(email);
  //   // create reset token
  //   const resetToken = '2jsdhsjh';
  //   // config email and send it to user email
  //   // use nodemailer
  //   let transporter = nodemailer.createTransport({
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     secure: false,
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PWD
  //     }
  //   });
  //   try {
  //     let info = await transporter.sendMail({
  //       from: `TTShop <ttshop@example.com>`,
  //       to: email,
  //       subject: 'Hello',
  //       text: 'Nhu cc'
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
});

exports.resetPassword = (req, res, next) => {};
