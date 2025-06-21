const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
