const Brand = require('./../models/brandModel');
const catchAsync = require('./../ultilities/catchAsync');

exports.getAllBrand = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();

  res.status(200).json({
    brands
  });
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.create(req.body);

  res.status(200).json({
    brand
  });
});
