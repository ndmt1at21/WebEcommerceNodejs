const Racket = require('./../models/racketModel');
const User = require('./../models/racketModel');
const APIFeatures = require('./../ultilities/APIFeatures');
const catchAsync = require('./../ultilities/catchAsync');
const AppError = require('./../ultilities/appError');

exports.getRackets = catchAsync(async (req, res, next) => {
  let query = Racket.find();

  const feature = new APIFeatures(query, req.query);
  feature.filter().sort();

  Racket.paginate(query, { page: req.query.page, limit: 10 }).then(
    (paginateRes) => {
      res.status(200).json({
        paginateRes
      });
    }
  );

  // res.status(200).render('list-grow', {
  //   title: 'TTShop - Shop bán vợt cầu lông chính hãng',
  //   header: 'Vợt cầu lông',
  //   currentPage,
  //   nPage,
  //   nPageShow,
  //   rackets
  // });
});

exports.getRacketByBrand = catchAsync(async (req, res, next) => {
  console.log('djfhajh');
  let query = Racket.find({ brand: req.params.brand });

  const rackets = await query;

  const feature = new APIFeatures(query, req.query);
  feature.filter().sort();

  Racket.paginate(query, { page: req.query.page, limit: 10 }).then(
    (paginateRes) => {
      res.status(200).json({
        paginateRes
      });
    }
  );

  // res.status(200).render('list-grow', {
  //   title: `TTShop | Bán vợt cầu lông ${req.params.brand} chính hãng`,
  //   header: 'Vợt cầu lông ${req.params.brand}',
  //   currentPage,
  //   nPage,
  //   nPageShow,
  //   rackets
  // });
});

exports.getRacketDetail = catchAsync(async (req, res, next) => {
  const racket = await Racket.findOne({ slug: req.params.slug });

  // res.status(200).render('details', {
  //   title: `TTShop - ${racket.name}`,
  //   racket
  // });
});
