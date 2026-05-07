const express = require('express');
const router = express.Router();
const contractorController = require('../controllers/contractorController');
const auth = require('../middleware/auth');
const apicache = require('apicache');
const cache = apicache.middleware;

router.use(auth);

router.get('/', cache('5 minutes'), contractorController.getAllContractors);
router.get('/services', cache('5 minutes'), contractorController.getServices);
router.get('/:id', contractorController.getContractorById);

module.exports = router;
