const brandController = require('./../controller/brandController');
const express = require('express');

const router = express.Router();

router.get('/', brandController.getAllbrand);
router.post('/', brandController.createReview);
