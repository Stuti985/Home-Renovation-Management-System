const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
title: String,
amount: Number,
vendor: String,
date: { type: Date, default: Date.now },
}, { timestamps: true });


module.exports = mongoose.model('Expense', ExpenseSchema);