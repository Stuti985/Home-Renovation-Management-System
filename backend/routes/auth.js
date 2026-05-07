const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

router.post(
  '/register',
  validate([
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ]),
  authController.register
);

router.post(
  '/login',
  validate([
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ]),
  authController.login
);

router.post(
  '/forgot-password',
  validate([
    body('email', 'Please include a valid email').isEmail()
  ]),
  authController.forgotPassword
);

router.patch(
  '/reset-password/:token',
  validate([
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ]),
  authController.resetPassword
);

router.get('/verify-email/:token', authController.verifyEmail);

router.get('/', auth, authController.getMe);

module.exports = router;
