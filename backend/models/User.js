const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
password: { type: String, required: true },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
avatar: { type: String, default: '' },
isEmailVerified: { type: Boolean, default: false },
emailVerificationToken: String,
passwordResetToken: String,
passwordResetExpires: Date,
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);