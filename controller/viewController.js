const Racket = require('./../models/racketModel');
const User = require('./../models/racketModel');
const catchAsync = require('./../ultilities/catchAsync');
const authController = require('./../controller/authController');

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

  res.status(200).render('index', {
    title: 'TTShop - Shop cầu lông uy tín',
    slides,
    banners
  });
  next();
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
