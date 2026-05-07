const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', projectController.getAllProjects);

router.post(
  '/',
  validate([
    body('title', 'Title is required').not().isEmpty()
  ]),
  projectController.createProject
);

router.get('/:id', projectController.getProjectById);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
