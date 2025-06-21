const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware');

// Authentication purposes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Details on profile
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
