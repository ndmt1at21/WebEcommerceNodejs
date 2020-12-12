const express = require('express');
const racketController = require('../controller/racketController');
const brandController = require('../controller/brandController');
const authController = require('./../controller/authController');
const reviewRouter = require('./../routes/reviewRouter');

const router = express.Router();

router.use('/:racketID/review', reviewRouter);

router
  .get('/', racketController.getRackets)
  .post(racketController.uploadRacketPhotos, racketController.createRacket);

router.get('/brand', brandController.getAllBrands);

router
  .get('/:id', racketController.getRacketByID)
  .delete('/:id', racketController.deleteRacketByID);

// alias
router.get(
  '/best-selling',
  racketController.aliasBestSelling,
  racketController.getRackets
);

// just for admin
router.use(authController.protect).use(authController.restrictTo('admin'));
module.exports = router;
