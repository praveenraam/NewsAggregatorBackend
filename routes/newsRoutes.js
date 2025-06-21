const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getGeneralNews,summarize } = require('../controllers/newsController');

// Interested News
router.get('/fetch', authMiddleware, newsController.fetchNews);

// General News
router.get('/general', authMiddleware, getGeneralNews);

// AI summarize and sentimental analysis
router.post('/summarize', authMiddleware, summarize);

module.exports = router;
