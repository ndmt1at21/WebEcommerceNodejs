const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/login', userController.getLogin);
router.get('/account', userController.getAccount);

module.exports = router;
