const express = require('express');
const racketController = require('../controller/racketController');
const brandController = require('../controller/brandController');
const authController = require('./../controller/authController');
const checkReqLimit = require('./../ultilities/checkReqLimit');

const router = express.Router();

router.get('/', racketController.getRackets);
router.get('/brand', brandController.getAllBrands);
router.get('/:id', racketController.getRacketByID);
router.get('/:slug', racketController.getRacketDetail);
router.post('/', racketController.createRacket);
router.delete('/:id', racketController.deleteRacketByID);

// alias
router.get(
  '/best-selling',
  racketController.aliasBestSelling,
  racketController.getRackets
);

// just for admin
router.use(authController.protect).use(authController.restrictTo('admin'));
module.exports = router;
