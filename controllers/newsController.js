import axios from 'axios';
import User from '../models/user.js';
import { summarizeAndAnalyze } from '../utils/geminiService.js';

// AI Summarizer
export const summarize = async (req, res) => {
  const { title, description, content } = req.body;

  if (!content && !title && !description) {
    return res.status(400).json({ error: "At least one of title, description, or content is required." });
  }

  // Combine the available fields into a single prompt
  const fullText = `
    ${title ? "Title: " + title : ""}
    ${description ? "\nDescription: " + description : ""}
    ${content ? "\nContent: " + content : ""}
    `;

  try {
    const result = await summarizeAndAnalyze(fullText);
    res.json(result);
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to summarize article" });
  }
};

// Interested News
export const fetchNews = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const interests = user?.interests || [];

    let allArticles = [];

    if (interests.length === 0) {
      const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          category: 'general',
          apiKey: process.env.NEWS_API_KEY,
        },
      });

      return res.json({ category: 'general', articles: data.articles });
    }

    for (const category of interests) {
      const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          category,
          apiKey: process.env.NEWS_API_KEY,
        },
      });

      allArticles.push(...data.articles);
    }

    const uniqueArticles = Array.from(new Map(allArticles.map(a => [a.url, a])).values());

    res.json({ categories: interests, articles: uniqueArticles });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};


// General News
export const getGeneralNews = async (req, res) => {
  try {
    const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us', 
        category: 'general',
        apiKey: process.env.NEWS_API_KEY
      },
    });

    res.json({ category: 'general', articles: data.articles });
  } catch (err) {
    console.error('Error fetching general news:', err.message);
    res.status(500).json({ error: 'Failed to fetch general news' });
  }
};