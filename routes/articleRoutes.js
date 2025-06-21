const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { saveArticle, markAsRead } = require('../controllers/articleController');
const { getSavedArticles } = require('../controllers/articleController');
const { deleteArticle } = require('../controllers/articleController');


// Save article
router.post('/save', authMiddleware, saveArticle);

// Mark as read
router.patch('/:id/read', authMiddleware, markAsRead);

// get saved
router.get('/saved', authMiddleware, getSavedArticles);

// delete saved
router.delete('/:id', authMiddleware, deleteArticle);

module.exports = router;
