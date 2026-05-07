const authService = require('../services/AuthService');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await authService.registerUser(name, email, password);
  res.status(201).json({ token });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.loginUser(email, password);
  res.status(200).json(data);
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  res.status(200).json(result);
});

exports.resetPassword = catchAsync(async (req, res) => {
  const result = await authService.resetPassword(req.params.token, req.body.password);
  res.status(200).json(result);
});

exports.verifyEmail = catchAsync(async (req, res) => {
  const result = await authService.verifyEmail(req.params.token);
  res.status(200).json(result);
});

exports.getMe = catchAsync(async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  res.status(200).json(user);
});
