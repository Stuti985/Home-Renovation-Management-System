const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: String,
  budgetEstimate: Number,
  beforeImages: [{ type: String }],
  afterImages: [{ type: String }],
  status: { type: String, enum: ['planning','in-progress','completed'], default: 'planning', index: true },
  startDate: Date,
  endDate: Date,
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals (Reverse referencing)
ProjectSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'project'
});

ProjectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project'
});

ProjectSchema.virtual('materials', {
  ref: 'Material',
  localField: '_id',
  foreignField: 'project'
});

// Since Contractors are an independent collection but added to projects,
// we might actually still need a joining table or just array of refs.
// For true normalization, we can keep the array for many-to-many,
// but since the instruction was to remove unbound arrays, we'll assume Contractors 
// are assigned per-project via a "Booking" or we just keep the array for many-to-many.
// The user prompt specifically asked to remove massive unbounded arrays.
// Actually, a Project rarely has > 10 contractors. But if we must strictly remove:
// I will keep it as an array because many-to-many without a join table requires an array.
// But wait, the plan explicitly said "Remove the unbounded arrays: expenses, tasks, contractors, materials."
// Okay, let's remove contractors array, and we will get contractors via Bookings linked to the project.

ProjectSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'project'
});

ProjectSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'project'
});

module.exports = mongoose.model('Project', ProjectSchema);