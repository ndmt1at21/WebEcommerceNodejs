const catchAsync = require('./../ultilities/catchAsync');

// alias
exports.aliasRacket = catchAsync(async (req, res, next) => {
  req.title = `TTShop - Shop vợt cầu lông chính hãng`;
  req.headerPage = `Vợt cầu lông`;
  next();
});

exports.aliasRacketWithBrand = catchAsync(async (req, res, next) => {
  req.query.brand = req.params.brand;
  req.title = `TTShop - Shop vợt cầu lông ${req.params.brand.toUpperCase()} chính hãng`;
  req.headerPage = `Vợt cầu lông ${req.params.brand.toUpperCase()}`;
  next();
});
