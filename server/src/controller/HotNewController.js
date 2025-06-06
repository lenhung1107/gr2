const Doctor = require("../models/Doctor");
require('dotenv').config();
const axios = require("axios");
class HotNewController {
  async getNew(req, res) {
    try {
        console.log(process.env.NEWS_API_KEY);
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=s%E1%BB%A9c%20kho%E1%BA%BB&language=vi&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Không lấy được tin tức" });
    }
  }
}

module.exports = new HotNewController();
