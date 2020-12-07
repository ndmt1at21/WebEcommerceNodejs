const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('./../controller/authController');
const brandController = require('./../controller/brandController');
const aliasController = require('./../controller/aliasController');
const router = express.Router();

router.use(viewController.parsePrice);

router.use(brandController.getAllBrands);
router.get('/', viewController.getOverview);

// alias
router.get(
  '/vot-cau-long-yonex',
  aliasController.aliasRacketYonex,
  viewController.getFilter
);

router.get(
  '/vot-cau-long',
  aliasController.aliasRacket,
  viewController.getFilter
);

// Normal view
router.get('/login', viewController.getLogin);
router.get('/cart', viewController.getCart);
router.get('/checkout', viewController.getCart);
router.get('/search', viewController.getSearch);
router.get('/filter', viewController.getFilter);
router.get('/about', viewController.getAbout);
router.get('/:slugWithID', viewController.getRacketDetail);

module.exports = router;
