const Racket = require('./../models/racketModel');
const User = require('./../models/racketModel');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../ultilities/catchAsync');
const APIFeatures = require('./../ultilities/APIFeatures');
const getRacketForShow = require('./../ultilities/getRacketForShow');
const AppError = require('./../ultilities/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const slides = [
    {
      image: 'slide-1.jpg',
      title: ['Yonex', 'Duora 10 Lengend'],
      subtitle: 'Mang đến trải nghiệm tuyệt vời',
      ref:
        '/vot-cau-long-yonex-duora-10-(legend-vision)-chinh-hang.60015254ac5db12d80c875a1'
    },
    {
      image: 'slide-2.jpg',
      title: ['Lining', 'Turbo Charging 75'],
      subtitle: 'Vợt tầm trung mạnh mẽ',
      ref: '/vot-cau-long-lining-turbo-charging-75.5ffc5d90f44e4f347c172cb3'
    },
    {
      image: 'slide-3.jpg',
      title: ['Yonex', 'Astrox 38S - rẻ bất ngờ'],
      subtitle: 'Vua moi ra mat',
      ref:
        '/vot-cau-long-yonex-astrox-38s-new-chinh-hang.5ffc5d90f44e4f347c172ca3'
    }
  ];

  const banners = [
    {
      image: 'banner-1.jpg',
      title: 'Yonex',
      ref: '/vot-cau-long-yonex.cat'
    },
    {
      image: 'banner-2.jpg',
      title: 'Lining',
      ref: '/vot-cau-long-lining.cat'
    },
    {
      image: 'banner-3.jpg',
      title: 'Victor',
      ref: '/vot-cau-long-victor.cat'
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
  const id = slugWithID.split('.')[1];

  // racket
  const racket = await Racket.findById(id);
  const racketForShow = getRacketForShow(racket);

  // racket related
  const racketsRelated = await Racket.find({
    $text: { $search: racket.brand }
  }).limit(10);

  // Paginate
  const reviewsQuery = Racket.find({ racket: id });
  Review.paginate(reviewsQuery, {
    page: req.query.page || 1,
    limit: 4
  })
    .then((result) => {
      res.status(200).render('product-detail', {
        title: `TTShop | ${racket.name}`,
        racketForShow,
        racket,
        racketsRelated,
        reviews: result.docs,
        paginateRes: result
      });
    })
    .catch((err) => console.log(err));
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

exports.getCheckout = catchAsync(async (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  }

  res.status(200).render('checkout', {
    title: 'Thanh toán sản phẩm'
  });
});

exports.getConfirm = catchAsync(async (req, res, next) => {
  if (!req.user) {
    res.redirect('/confirm');
  }

  res.status(200).render('confirm', {
    title: 'Đặt hàng thành công'
  });
});

exports.getFilter = catchAsync(async (req, res, next) => {
  const query = Racket.find();
  const feature = new APIFeatures(query, req.query);
  feature.filter().sort();

  Racket.paginate(query, {
    page: req.query.page >= 1 ? req.query.page : 1,
    limit: 9
  })
    .then((result) => {
      res.status(200).render('list-grid', {
        title: req.title,
        headerPage: req.headerPage,
        paginateRes: result,
        rackets: result.docs
      });
    })
    .catch((err) => {
      return next(new AppError('Page not found', 404));
    });
});

exports.trackOrder = catchAsync(async (req, res, next) => {
  res.status(200).render('track-order', {
    title: 'Kiểm tra đơn hàng'
  });
});

exports.getAbout = catchAsync(async (req, res, next) => {
  res.status(200).render('about', {
    title: 'TTShop - Về chúng tôi'
  });
});

exports.getSearch = catchAsync(async (req, res, next) => {
  const query = Racket.find({
    name: { $regex: `${req.query.keyword}`, $options: 'i' }
  });

  // limit for test
  Racket.paginate(query, {
    limit: 10,
    page: req.query.page || 1
  })
    .then((result) => {
      res.status(200).render('list-grid', {
        title: `Kết quả tìm kiếm cho từ  khoá ${req.query.keyword || ''}`,
        headerPage: `Kết quả tìm kiếm (${result.docs.length} sản phẩm) `,
        paginateRes: result,
        rackets: result.docs
      });
    })
    .catch((err) => {
      return next(new AppError('Page not found', 404));
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
  if (!req.user) res.redirect('/');
  res.status(200).render('user', {
    title: 'Trang cá nhân'
  });
});

exports.getChangePassword = catchAsync(async (req, res, next) => {
  if (!req.user) res.redirect('/');
  res.status(200).render('update-password', {
    title: 'Đổi mật khẩu'
  });
});

exports.getResetPassword = catchAsync(async (req, res, next) => {
  if (!req.user) res.redirect('/');
  res.status(200).render('reset-password', {
    title: 'Reset mật khẩu'
  });
});

exports.getSearchAdv = catchAsync(async (req, res, next) => {
  res.status(200).render('searchAdv', {
    title: 'Tìm kiếm nâng cao'
  });
});

exports.getLeaveReview = catchAsync(async (req, res, next) => {
  // if (!req.user) res.redirect('/login');
  const racket = await Racket.findById(req.params.slugWithID.split('.')[1]);

  if (!racket) return AppError('Page not found', 404);

  res.status(200).render('leave-review', {
    title: `Nhận xét về sản phẩm ${racket.name}'`,
    racket
  });
});
