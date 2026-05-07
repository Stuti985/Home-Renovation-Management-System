const bookingService = require('../services/BookingService');
const catchAsync = require('../utils/catchAsync');

exports.getUserBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getUserBookings(req.user.id);
  res.status(200).json(bookings);
});

exports.createBooking = catchAsync(async (req, res) => {
  const { contractorId, date, notes } = req.body;
  const booking = await bookingService.createBooking(req.user.id, contractorId, date, notes);
  res.status(201).json(booking);
});

exports.cancelBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.user.id, req.params.id);
  res.status(200).json(booking);
});
