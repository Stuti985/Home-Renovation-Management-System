const Project = require('../models/Project');
const AppError = require('../utils/AppError');

class ProjectService {
  async getAllProjects(userId) {
    return await Project.find({ user: userId }).sort({ date: -1 });
  }

  async createProject(userId, title, description) {
    const project = new Project({
      title,
      description,
      user: userId,
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
    if (project.user.toString() !== userId) throw new AppError('User not authorized', 401);
    
    return project;
  }

  async deleteProject(userId, projectId) {
    const project = await Project.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.user.toString() !== userId) throw new AppError('User not authorized', 401);
    
    await Project.findByIdAndDelete(projectId);
    return { msg: 'Project removed' };
  }
}

module.exports = new ProjectService();
