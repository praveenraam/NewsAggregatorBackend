const Article = require('../models/article');

// Save
exports.saveArticle = async (req, res) => {
  try {

    const { url } = req.body;

    const existing = await Article.findOne({ url, userId: req.user.id });

    if (existing) {
      return res.status(400).json({ message: 'Article already saved' });
    }

    const article = new Article({
      ...req.body,
      userId: req.user.id
    });

    await article.save();

    res.status(201).json({ message: "Article saved", article });
  } catch (err) {
    res.status(500).json({ error: "Failed to save article", details: err.message });
  }
};

// Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Marked as read", article });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read", details: err.message });
  }
};

// Get all saved
exports.getSavedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({ count: articles.length, articles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles', details: err.message });
  }
};

// Delete saved article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found or unauthorized' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete article', details: err.message });
  }
};