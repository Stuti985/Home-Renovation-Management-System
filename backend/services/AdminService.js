const User = require('../models/User');
const Review = require('../models/Review');
const Contractor = require('../models/Contractor');
const AppError = require('../utils/AppError');

class AdminService {
  async getAllUsers() {
    return await User.find().select('-password');
  }

  async promoteUser(userId) {
    const user = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true }).select('-password');
    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  async getAllContractors() {
    return await Contractor.find();
  }

  async getAllReviews() {
    return await Review.find()
      .populate('user', 'name email')
      .populate('contractor', 'name service');
  }

  async updateReviewStatus(reviewId, status) {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      throw new AppError('Invalid status', 400);
    }
    const review = await Review.findByIdAndUpdate(reviewId, { status }, { new: true });
    if (!review) throw new AppError('Review not found', 404);
    return review;
  }
}

module.exports = new AdminService();
