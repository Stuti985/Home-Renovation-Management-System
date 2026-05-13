const Project = require('../models/Project');
const Task = require('../models/Task');
const Expense = require('../models/Expense');
const AppError = require('../utils/AppError');
const notificationService = require('./NotificationService');

class ProjectService {
  async getAllProjects(userId) {
    return await Project.find({ owner: userId }).sort({ date: -1 });
  }

  async createProject(userId, title, description) {
    const project = new Project({
      title,
      description,
      owner: userId,
    });
    return await project.save();
  }

  async getProjectById(userId, projectId) {
    const project = await Project.findById(projectId)
      .populate('tasks')
      .populate('expenses')
      .populate('materials')
      .populate({
        path: 'bookings',
        populate: { path: 'contractor' }
      })
      .populate({
        path: 'reviews',
        populate: { path: 'contractor' }
      });

    if (!project) throw new AppError('Project not found', 404);
    if (project.owner.toString() !== userId) throw new AppError('User not authorized', 401);

    return project;
  }

  async deleteProject(userId, projectId) {
    const project = await Project.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.owner.toString() !== userId) throw new AppError('User not authorized', 401);

    await Project.findByIdAndDelete(projectId);
    return { msg: 'Project removed' };
  }
  async addTask(userId, projectId, title) {
    const project = await Project.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.owner.toString() !== userId) throw new AppError('User not authorized', 401);

    const task = new Task({
      project: projectId,
      title
    });
    return await task.save();
  }

  async updateTask(userId, projectId, taskId, completed) {
    const project = await Project.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.owner.toString() !== userId) throw new AppError('User not authorized', 401);

    const task = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      { completed },
      { new: true }
    );
    if (!task) throw new AppError('Task not found', 404);

    if (completed) {
      await notificationService.createNotification(
        userId,
        'Task Completed',
        `You completed the task "${task.title}" for project "${project.title}".`,
        'success'
      );
    }

    return task;
  }

  async addExpense(userId, projectId, description, amount) {
    const project = await Project.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.owner.toString() !== userId) throw new AppError('User not authorized', 401);

    const expense = new Expense({
      project: projectId,
      description,
      amount
    });
    const savedExpense = await expense.save();

    await notificationService.createNotification(
      userId,
      'Expense Added',
      `You logged a new expense of $${amount} for project "${project.title}".`,
      'info'
    );

    return savedExpense;
  }
}

module.exports = new ProjectService();
