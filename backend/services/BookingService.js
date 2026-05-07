const Booking = require('../models/Booking');
const AppError = require('../utils/AppError');

class BookingService {
  async getUserBookings(userId) {
    return await Booking.find({ user: userId })
      .populate('contractor', 'name service rate')
      .sort({ date: 1 });
  }

  async createBooking(userId, contractorId, date, notes) {
    if (!contractorId || !date) {
      throw new AppError('Contractor and date are required', 400);
    }
    const booking = new Booking({
      user: userId,
      contractor: contractorId,
      date,
      notes
    });
    return await booking.save();
  }

  async cancelBooking(userId, bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new AppError('Booking not found', 404);
    
    if (booking.user.toString() !== userId) {
      throw new AppError('Not authorized', 403);
    }

    booking.status = 'cancelled';
    return await booking.save();
  }
}

module.exports = new BookingService();
