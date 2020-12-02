const AppError = require('../ultilities/appError');

/** @type {AppError} err */
const sendErrorDev = (err, req, res) => {
  console.error('ERROR: ', err);
  return res.status(err.statusCode).render('error', {
    message: err.message
  });
};

/** @type {AppError} err */
const sendErrorProd = (err, req, res) => {
  // operational error
  if (err.isOperational === true) {
    console.error('ERROR: ', err);
    return res.statusCode(err.statusCode).render('error', {
      message: err.message
    });
  }

  // programming or unknown error
  // not leak to user
  console.error('ERROR: ', err);
  return (
    res.statusCode(500).render('error'),
    {
      message: 'Some thing went wrong'
    }
  );
};

// middle cuoi cung, ko can goi next
// nhung tham so co next, de express nhan ra la middleware errror handler
/** @type {AppError} err */
exports.globalErrorHandler = (err, req, res, next) => {
  // send much info about error as possible as
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }
  // send infor error, this help user undestand
  else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res);
  }
};
