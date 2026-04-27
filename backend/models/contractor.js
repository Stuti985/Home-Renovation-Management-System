const mongoose = require('mongoose');


const ContractorSchema = new mongoose.Schema({
name: String,
contact: String,
service: String,
rate: Number,
}, { timestamps: true });


module.exports = mongoose.model('Contractor', ContractorSchema);