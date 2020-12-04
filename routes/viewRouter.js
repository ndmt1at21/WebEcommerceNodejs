const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('./../controller/authController');
const brandController = require('./../controller/brandController');
const router = express.Router();

router.use(brandController.getAllBrands);
router.get('/', viewController.getOverview);
router.get('/login', viewController.getLogin);
router.get('/cart', viewController.getCart);
router.get('/checkout', viewController.getCart);
module.exports = router;
