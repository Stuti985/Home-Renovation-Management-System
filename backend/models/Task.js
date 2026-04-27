const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
title: { type: String, required: true },
description: String,
assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
status: { type: String, enum: ['todo','in-progress','done'], default: 'todo' },
dueDate: Date,
estimatedHours: Number,
}, { timestamps: true });


module.exports = mongoose.model('Task', TaskSchema);