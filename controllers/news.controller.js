const axios = require("axios");
const Preference = require("../models/Prefernce");

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; 

exports.getNews = async (req, res) => {
  try {
    const preference = await Preference.findOne({ user: req.user.id });

    if (!preference) {
      return res.status(404).json({
        message: "User preferences not found"
      });
    }

    const { categories, languages } = preference;

    if (!categories?.length) {
      return res.status(400).json({
        message: "No categories selected in preferences"
      });
    }

    const category = categories[0];
    const language = languages?.[0] || "en";

  
    const cacheKey = `${category}_${language}`;

   
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);

      if (Date.now() < cachedData.expiry) {
        return res.status(200).json({
          source: "cache",
          totalResults: cachedData.data.totalResults,
          articles: cachedData.data.articles
        });
      }
      cache.delete(cacheKey);
    }

    const response = await axios.get(
      `https://gnews.io/api/v4/search`,
      {
        params: {
          q: category,
          lang: language,
          max: 5,
          apikey: process.env.NEWS_API_KEY
        }
      }
    );

    // 🗄 Store only needed data
    cache.set(cacheKey, {
      data: response.data,
      expiry: Date.now() + CACHE_TTL
    });

    res.status(200).json({
      source: "api",
      totalResults: response.data.totalResults,
      articles: response.data.articles
    });

  } catch (error) {

    if (error.response) {
      return res.status(error.response.status).json({
        message: "News API error",
        error: error.response.data
      });
    }

    res.status(500).json({
      message: "Server error while fetching news",
      error: error.message
    });
  }
};