const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', bookingController.getUserBookings);

router.post(
  '/',
  validate([
    body('contractorId', 'Contractor is required').not().isEmpty(),
    body('date', 'Date is required').not().isEmpty()
  ]),
  bookingController.createBooking
);

router.put('/:id/cancel', bookingController.cancelBooking);

module.exports = router;
