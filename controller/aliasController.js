const catchAsync = require('./../ultilities/catchAsync');

// alias
exports.aliasRacket = catchAsync(async (req, res, next) => {
  req.title = 'TTShop - Vợt cầu lông chính hãng';
  next();
});

exports.aliasRacketYonex = catchAsync(async (req, res, next) => {
  req.query.brand = 'yonex';
  req.title = 'TTShop - Vợt Yonex chính hãng';
  next();
});

exports.aliasRacketVictor = catchAsync(async (req, res, next) => {
  req.query.brand = 'victor';
  req.title = 'TTShop - Vợt Victor chính hãng';
  next();
});
