const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { updateInterests, getInterests, getUserDetails } = require('../controllers/userController');

// Update user interests
router.post('/interests', authMiddleware, updateInterests);

// Get user interests
router.get('/interests',authMiddleware,getInterests);

// Get user details
router.get('/userDetails',authMiddleware,getUserDetails);

module.exports = router;
