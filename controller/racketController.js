const Racket = require('./../models/racketModel');
const APIFeatures = require('./../ultilities/APIFeatures');
const catchAsync = require('./../ultilities/catchAsync');
const AppError = require('./../ultilities/appError');
const factory = require('./../controller/handlerFactory');
const crypto = require('crypto');

const multer = require('multer');

// errro when upload > 5 files (default)
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/rackets');
  },

  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];

    const randomStr = crypto.randomBytes(24).toString('hex');
    cb(null, randomStr + Date.now().toString() + '.' + ext);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Định dạng không được hỗ trợ'), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: multerFilter
});

exports.uploadRacketPhotos = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1
  },
  {
    name: 'images',
    maxCount: 5
  }
]);

exports.getRackets = catchAsync(async (req, res, next) => {
  let query = Racket.find();

  const feature = new APIFeatures(query, req.query);
  feature.filter().sort().limit();

  Racket.paginate(query, {
    page: req.query.page > 0 ? req.query.page : 1
  })
    .then((result) => {
      res.setHeader('X-Paging-Count', `${result.totalPages}`);
      res.setHeader('X-Paging-Current', `${result.page}`);

      res.status(200).json({
        status: 'success',
        data: {
          rackets: result.docs
        }
      });
    })
    .catch((err) => console.log(err));
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
    return new AppError('Page not found', 404);
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

  if (req.files.imageCover) {
    racket.imageCover = req.files.imageCover[0].filename;
  }

  if (req.files.images) {
    racket.images = req.files.images.map((el) => el.filename);
  }

  await Racket.create(racket);

  res.status(200).json({
    status: 'success'
  });
});

exports.deleteRacketByID = factory.deleteOne(Racket);

// alias
exports.aliasBestSelling = catchAsync(async (req, res, next) => {
  req.query = {};
  req.sort = 'price';
  next();
});
