const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
description: String,
budgetEstimate: Number,
expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
contractors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' }],
materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
status: { type: String, enum: ['planning','in-progress','completed'], default: 'planning' },
startDate: Date,
endDate: Date,
}, { timestamps: true });


module.exports = mongoose.model('Project', ProjectSchema);