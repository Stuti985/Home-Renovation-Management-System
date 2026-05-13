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

exports.addTask = catchAsync(async (req, res) => {
  const task = await projectService.addTask(req.user.id, req.params.id, req.body.title);
  res.status(201).json(task);
});

exports.updateTask = catchAsync(async (req, res) => {
  const task = await projectService.updateTask(req.user.id, req.params.projectId, req.params.taskId, req.body.completed);
  res.status(200).json(task);
});

exports.addExpense = catchAsync(async (req, res) => {
  const expense = await projectService.addExpense(req.user.id, req.params.id, req.body.description, req.body.amount);
  res.status(201).json(expense);
});
