const Brand = require('./../models/brandModel');
const catchAsync = require('./../ultilities/catchAsync');
const factory = require('./../controller/handlerFactory');

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();

  res.status(200).json({
    status: 'success',
    data: {
      brands
    }
  });
});

exports.createBrand = factory.createOne(Brand);
exports.updateBrand = factory.updateOne(Brand);
exports.deleteBrand = factory.deleteOne(Brand);
