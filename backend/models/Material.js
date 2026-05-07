const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  purchased: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Material', MaterialSchema);