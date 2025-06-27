const Doctor = require("../models/Doctor");
require("dotenv").config();
const axios = require("axios");
class HotNewController {
  async getNew(req, res) {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          q: "health OR medical OR medicine OR covid OR vaccine",
          sortBy: "publishedAt",
          pageSize: 5,
          from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          apiKey: process.env.NEWS_API_KEY,
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Không lấy được tin tức" });
    }
  }
}

module.exports = new HotNewController();
