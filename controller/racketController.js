const Racket = require('./../models/racketModel');
const APIFeatures = require('./../ultilities/APIFeatures');
const catchAsync = require('./../ultilities/catchAsync');
const AppError = require('./../ultilities/appError');

exports.getRackets = catchAsync(async (req, res, next) => {
  let query = Racket.find();

  const feature = new APIFeatures(query, req.query);
  feature.filter().sort();

  // Racket.paginate(query, { page: req.query.page, limit: 10 }).then(
  //   (paginateRes) => {
  //     res.status(200).json({
  //       paginateRes
  //     });
  //   }
  // );
  const rackets = await query;
  res.status(200).json({
    status: 'success',
    data: {
      rackets
    }
  });
});

exports.getRacketDetail = catchAsync(async (req, res, next) => {
  const racket = await Racket.findOne({ slug: req.params.slug });

  if (!racket) {
    return new AppError('San pham da bi xoa hoac duong dan khong ton tai', 404);
  }

  req.status(200).json({
    status: 'success',
    data: {
      racket
    }
  });
});

// alias
exports.aliasBestSelling = catchAsync((req, res, next) => {
  req.sort = 'price';
  next();
});
