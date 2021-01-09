const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('./../controller/authController');
const brandController = require('./../controller/brandController');
const aliasController = require('./../controller/aliasController');
const brandNameForHeader = require('./../ultilities/brandNameForHeader');

const router = express.Router();

// ASSIGN BRAND NAME TO REQ, SHOW IN HEADER
router.use(brandNameForHeader);

// ALIAS
router.get(
  '/vot-cau-long',
  authController.isLoggedIn,
  aliasController.aliasRacket,
  viewController.getFilter
);

router.get(
  '/vot-cau-long-:brand.cat',
  authController.isLoggedIn,
  aliasController.aliasRacketWithBrand,
  viewController.getFilter
);

// NORMAL VIEW
router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get('/cart', authController.isLoggedIn, viewController.getCart);
router.get('/checkout', authController.isLoggedIn, viewController.getCheckout);
router.get('/filter', authController.isLoggedIn, viewController.getFilter);
router.get('/about', authController.isLoggedIn, viewController.getAbout);
router.get('/search', authController.isLoggedIn, viewController.getSearch);
router.get(
  '/track-order',
  authController.isLoggedIn,
  viewController.trackOrder
);
router.get('/user', authController.isLoggedIn, viewController.getUser);
router.get('/reset/:token', viewController.getResetPassword);
router.get('/:slugWithID/leave-review', viewController.getLeaveReview);

router.get(
  '/:slugWithID',
  authController.isLoggedIn,
  viewController.getRacketDetail
);

module.exports = router;
