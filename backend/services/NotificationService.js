const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');

class NotificationService {
  async getUserNotifications(userId) {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
  }

  async markAsRead(userId, notificationId) {
    const notification = await Notification.findById(notificationId);
    if (!notification) throw new AppError('Notification not found', 404);
    
    if (notification.user.toString() !== userId) {
      throw new AppError('Not authorized', 403);
    }

    notification.read = true;
    return await notification.save();
  }
}

module.exports = new NotificationService();
