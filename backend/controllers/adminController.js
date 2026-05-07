const adminService = require('../services/AdminService');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await adminService.getAllUsers();
  res.status(200).json(users);
});

exports.promoteUser = catchAsync(async (req, res) => {
  const user = await adminService.promoteUser(req.params.id);
  res.status(200).json(user);
});

exports.getAllContractors = catchAsync(async (req, res) => {
  const contractors = await adminService.getAllContractors();
  res.status(200).json(contractors);
});

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await adminService.getAllReviews();
  res.status(200).json(reviews);
});

exports.updateReviewStatus = catchAsync(async (req, res) => {
  const review = await adminService.updateReviewStatus(req.params.id, req.body.status);
  res.status(200).json(review);
});
