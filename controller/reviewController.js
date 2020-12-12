const catchAsync = require('./../ultilities/catchAsync');
const Review = require('./../models/reviewModel');
const factory = require('./../controller/handlerFactory');
const APIFeatures = require('./../ultilities/APIFeatures');

exports.getReviews = catchAsync(async (req, res, next) => {
  const query = Review.find({ racket: req.params.racketID });

  const feature = new APIFeatures(query, req.query);
  feature.filter().sort();

  Review.paginate(query, {
    page: req.query.page > 0 ? req.query.page : 1,
    limit: req.query.limit
  })
    .then((result) => {
      res.setHeader('X-Paging-Count', `${result.totalPages}`);
      res.setHeader('X-Paging-Current', `${result.page}`);

      res.status(200).json({
        status: 'success',
        data: {
          reviews: result.docs
        }
      });
    })
    .catch((err) => console.log(err));
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = Review.find({
    racket: req.params.racketID,
    user: req.user._id
  });

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  req.body.racket = req.params.racketID;
  console.log(req.body);
  req.body.user = req.user._id;

  const review = await Review.create(req.body);

  console.log(review);

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

// exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
