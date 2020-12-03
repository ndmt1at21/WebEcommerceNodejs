const express = require('express');
const racketController = require('../controller/racketController');

const router = express.Router();

router.get('/', racketController.getRackets);
router.get('/brand/:brand', racketController.getRacketByBrand);
router.get('/:slug', racketController.getRacketDetail);

module.exports = router;
