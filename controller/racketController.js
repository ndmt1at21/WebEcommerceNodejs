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

exports.getRacketByID = catchAsync(async (req, res, next) => {
  const racket = await Racket.findById(req.params.id);

  if (!racket) {
    return new AppError('San pham da bi xoa hoac duong dan khong ton tai', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      racket
    }
  });
});

exports.getRacketDetail = catchAsync(async (req, res, next) => {
  const racket = await Racket.findOne({ slug: req.params.slug });

  if (!racket) {
    return new AppError('San pham da bi xoa hoac duong dan khong ton tai', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      racket
    }
  });
});

exports.createRacket = catchAsync(async (req, res, next) => {
  const racket = req.body;
  console.log(req.body);
  await Racket.create(racket);

  res.status(200).json({
    status: 'success'
  });
});

exports.deleteRacketByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  Racket.findByIdAndUpdate(id, { active: false });

  res.status(200).json({
    status: 'success'
  });
});

// alias
exports.aliasBestSelling = catchAsync(async (req, res, next) => {
  req.query = {};
  req.sort = 'price';
  next();
});
