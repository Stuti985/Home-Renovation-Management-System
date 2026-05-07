const mongoose = require('mongoose');

const ContractorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: '' },
  contact: String,
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', index: true },
  rate: Number,
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Contractor', ContractorSchema);