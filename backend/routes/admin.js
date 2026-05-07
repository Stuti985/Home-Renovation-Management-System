const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

router.use(auth);
router.use(adminAuth);

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/promote', adminController.promoteUser);
router.get('/contractors', adminController.getAllContractors);
router.get('/reviews', adminController.getAllReviews);
router.put('/reviews/:id', adminController.updateReviewStatus);

module.exports = router;
