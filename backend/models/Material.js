const mongoose = require('mongoose');


const MaterialSchema = new mongoose.Schema({
project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
name: String,
vendor: String,
quantity: Number,
unitPrice: Number,
}, { timestamps: true });


module.exports = mongoose.model('Material', MaterialSchema);