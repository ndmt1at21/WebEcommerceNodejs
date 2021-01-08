const express = require('express');
const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.post('/forgot', authController.forgotPassword);
router.patch('/reset/:token', authController.resetPassword);

router.use(authController.protect);

// router.patch('/updateMyPassword', authController.updateMyPassword);
// router.get('/updateInfo', authController.updateInfo);

// just for admin
// router.use(authController.restrictTo('admin'));
// router
//   .route('/')
//   .get(userController.getManyUsers)
//   .post(userController.createUser);

router
 .route('/:id')
 .get(userController.getUserByID)
 .patch(userController.updateUser)
 .delete(userController.deleteUser);

module.exports = router;
