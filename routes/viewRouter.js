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
  aliasController.aliasRacket,
  viewController.getFilter
);

router.get(
  '/vot-cau-long-:brand',
  aliasController.aliasRacketWithBrand,
  viewController.getFilter
);

// NORMAL VIEW
router.get('/', viewController.getOverview);
router.get('/login', viewController.getLogin);
router.get('/cart', viewController.getCart);
router.get('/checkout', viewController.getCheckout);
router.get('/search', viewController.getSearch);
router.get('/filter', viewController.getFilter);
router.get('/about', viewController.getAbout);
router.get('/search', viewController.getSearch);
router.get('/:slugWithID', viewController.getRacketDetail);

module.exports = router;
