const notificationService = require('../services/NotificationService');
const catchAsync = require('../utils/catchAsync');

exports.getUserNotifications = catchAsync(async (req, res) => {
  const notifications = await notificationService.getUserNotifications(req.user.id);
  res.status(200).json(notifications);
});

exports.markAsRead = catchAsync(async (req, res) => {
  const notification = await notificationService.markAsRead(req.user.id, req.params.id);
  res.status(200).json(notification);
});
