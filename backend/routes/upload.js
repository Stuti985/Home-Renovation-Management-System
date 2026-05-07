const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');

router.post('/', auth, uploadController.uploadImage, uploadController.uploadHandler);

module.exports = router;
