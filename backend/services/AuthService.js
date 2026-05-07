const User = require('../models/User');
const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('./EmailService');

class AuthService {
  async registerUser(name, email, password) {
    let user = await User.findOne({ email });
    if (user) {
      throw new AppError('User already exists', 400);
    }

    user = new User({ name, email, password });
    
    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = crypto.createHash('sha256').update(verifyToken).digest('hex');
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Fire and forget email
    emailService.sendVerificationEmail(user, verifyToken).catch(console.error);

    return this.generateToken(user.id);
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('Invalid credentials', 400);
    }
    
    if (!user.isEmailVerified) {
      throw new AppError('Please verify your email before logging in', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 400);
    }

    return { token: this.generateToken(user.id), user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }

  generateToken(userId) {
    const payload = { user: { id: userId } };
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });
  }

  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('There is no user with that email address', 404);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    try {
      await emailService.sendPasswordResetEmail(user, resetToken);
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new AppError('There was an error sending the email. Try again later!', 500);
    }
    
    return { msg: 'Token sent to email!' };
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new AppError('Token is invalid or has expired', 400);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    return { msg: 'Password reset successfully!' };
  }

  async verifyEmail(token) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({ emailVerificationToken: hashedToken });
    if (!user) {
      throw new AppError('Token is invalid', 400);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    return { msg: 'Email verified successfully!' };
  }
}

module.exports = new AuthService();
