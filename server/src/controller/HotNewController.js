const Doctor = require("../models/Doctor");
require("dotenv").config();
const axios = require("axios");
class HotNewController {
  async getNew(req, res) {
    try {
      const feed = await parser.parseURL(
        "https://vnexpress.net/rss/suc-khoe.rss"
      );
      const articles = feed.items.slice(0, 5); 
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Không lấy được tin tức từ RSS" });
    }
  }
}

module.exports = new HotNewController();
