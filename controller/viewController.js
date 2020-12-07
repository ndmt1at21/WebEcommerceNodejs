const Racket = require('./../models/racketModel');
const User = require('./../models/racketModel');
const catchAsync = require('./../ultilities/catchAsync');
const APIFeatures = require('./../ultilities/APIFeatures');
const getRacketForShow = require('./../ultilities/getRacketForShow');
const { paginate } = require('./../models/racketModel');
const AppError = require('./../ultilities/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const slides = [
    {
      image: 'slide-1.jpg',
      title: ['Yonex', 'Impressive'],
      subtitle: 'Vua moi ra mat',
      ref: 'google.com'
    },
    {
      image: 'slide-2.jpg',
      title: ['Lining', 'Impressive'],
      subtitle: 'Vua moi ra mat',
      ref: 'google.com'
    },
    {
      image: 'slide-3.jpg',
      title: ['VNB', 'Impressive'],
      subtitle: 'Vua moi ra mat',
      ref: 'google.com'
    }
  ];

  const banners = [
    {
      image: 'banner-1.jpg',
      title: 'Yonex',
      ref: 'google.com'
    },
    {
      image: 'banner-2.jpg',
      title: 'Yonex',
      ref: 'google.com'
    },
    {
      image: 'banner-3.jpg',
      title: 'Yonex',
      ref: 'google.com'
    }
  ];

  // Best seller
  const limitRacket = 10;
  const queryBestSeller = Racket.find().sort('-sold').limit(limitRacket);

  // Moi Nhat
  const queryNewest = Racket.find().sort('-createdDate').limit(limitRacket);

  const [racketsBestSeller, racketsNewest] = [
    await queryBestSeller,
    await queryNewest
  ];

  res.status(200).render('index', {
    title: 'TTShop - Shop cầu lông uy tín',
    slides,
    banners,
    sectionRackets: [
      { title: 'Vợt bán chạy', rackets: racketsNewest },
      { title: 'Vợt mới nhất', rackets: racketsBestSeller }
    ]
  });

  next();
});

exports.getRacketDetail = catchAsync(async (req, res, next) => {
  const slugWithID = req.params.slugWithID;
  const id = slugWithID.slice(slugWithID.lastIndexOf('.') + 1);

  const racket = await Racket.findById(id);
  const racketForShow = getRacketForShow(racket);

  console.log(racketForShow);
  res.status(200).render('product-detail', {
    title: `TTShop | ${racket.name}`,
    racketForShow,
    racket
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }

  res.status(200).render('login', {
    title: 'Đăng nhập để tiếp tục'
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  res.status(200).render('cart', {
    title: 'Giỏ hàng'
  });
});

const parsePriceStr = (priceStr) => {
  if (priceStr.includes('-')) {
    let [min, max] = priceStr.split('-');

    let price = [];
    if (max == 0) {
      price = {
        gte: min
      };
    } else {
      price = {
        gte: min,
        lte: max
      };
    }
    return price;
  }
};
exports.parsePrice = catchAsync(async (req, res, next) => {
  if (Array.isArray(req.query.price)) {
    let priceConvert = [];

    req.query.price.forEach((el) => {
      if (el.includes('-')) {
        const price = parsePriceStr(el);
        priceConvert = { ...priceConvert, ...price };
      }
    });

    req.query.price = priceConvert;
  } else if (req.query.price) {
    req.query.price = parsePriceStr(req.query.price);
  }
  next();
});

exports.getFilter = catchAsync(async (req, res, next) => {
  const query = Racket.find();
  const feature = new APIFeatures(query, req.query);
  feature.filter().sort();

  User.paginate(query, {
    page: req.query.page >= 1 ? req.query.page : 1,
    limit: 9
  })
    .then((result) => {
      res.status(200).render('list-grid', {
        title: req.title,
        paginateRes: result,
        rackets: result.docs
      });
    })
    .catch((err) => {
      return next(new AppError('Page not found', 404));
    });
});

exports.getSearch = catchAsync(async (req, res, next) => {});

exports.checkout = catchAsync(async (req, res, next) => {
  res.status(200).render('checkout', {
    title: 'Thanh toán'
  });
});

exports.getAbout = catchAsync(async (req, res, next) => {
  console.log('dsfjdjjhn');
  res.status(200).render('about', {
    title: 'TTShop - Về chúng tôi'
  });
});
