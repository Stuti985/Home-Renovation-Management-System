const projectService = require('../services/ProjectService');
const catchAsync = require('../utils/catchAsync');

exports.getAllProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getAllProjects(req.user.id);
  res.status(200).json(projects);
});

exports.createProject = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const project = await projectService.createProject(req.user.id, title, description);
  res.status(201).json(project);
});

exports.getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.user.id, req.params.id);
  res.status(200).json(project);
});

exports.deleteProject = catchAsync(async (req, res) => {
  const result = await projectService.deleteProject(req.user.id, req.params.id);
  res.status(200).json(result);
});
