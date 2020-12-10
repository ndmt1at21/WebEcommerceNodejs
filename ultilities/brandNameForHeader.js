const Brand = require('./../models/brandModel');
const catchAsync = require('./../ultilities/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();
  res.locals.brands = brands;

  next();
});
