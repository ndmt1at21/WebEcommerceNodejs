const express = require('express');
const racketController = require('../controller/racketController');
const authController = require('./../controller/authController');

const router = express.Router();

router.get('/', racketController.getRackets);
router.get('/:slug', racketController.getRacketDetail);

// alias
router.get(
  '/best-selling',
  racketController.getBestSelling,
  racketController.getRackets
);

// just for admin
router.use(authController.protect).use(authController.restrictTo('admin'));
module.exports = router;
