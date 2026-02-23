const axios = require("axios");
const Preference = require("../models/Prefernce");

exports.getNews = async (req, res) => {
    try {

        const preference = await Preference.findOne({ user: req.user.id });

        if (!preference) {
            return res.status(404).json({
                message: "User preferences not found"
            });
        }

        const { categories, languages } = preference;

        if (!categories.length) {
            return res.status(400).json({
                message: "No categories selected in preferences"
            });
        }

        const category = categories[0];
        const language = languages[0] || "en";

        const response = await axios.get(`https://gnews.io/api/v4/search?q=${category}&lang=${language}&max=5&apikey=${process.env.NEWS_API_KEY}`, {
            params: {
                apiKey: process.env.NEWS_API_KEY,
                category,
                language,
                pageSize: 10
            }
        });
        res.status(200).json({
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