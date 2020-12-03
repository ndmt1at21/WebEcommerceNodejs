const brandController = require('./../controller/brandController');
const express = require('express');

const router = express.Router();

router.get('/', brandController.getAllBrands);
router.post('/', brandController.createBrand);

module.exports = router;
