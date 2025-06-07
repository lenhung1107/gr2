const Doctor = require("../models/Doctor");
require("dotenv").config();
class HotNewController {
  async getNew(req, res) {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=sức khỏe&language=vi&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi NewsAPI:", error.message);
      res.status(500).json({ error: "Không lấy được tin tức" });
    }
  }
}

module.exports = new HotNewController();
