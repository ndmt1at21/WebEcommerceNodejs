const reviewController = require('./../controller/reviewController');
const express = require('express');

const router = express.Router();

router.get('/', reviewController.getAllBrand);
router.post('/', reviewController.createBrand);
