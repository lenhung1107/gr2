const Subscription = require("../models/Subscription");

class NotificationController {
  async subscribe(req, res) {
    try {
      const subscription = req.body;
      const userId = req.user ? req.user._id : null;
      const existing = await Subscription.findOne({
        endpoint: subscription.endpoint,
      });

      if (!existing) {
        await Subscription.create({ ...subscription, userId });
      }

      res.status(201).json({ message: "Đăng ký nhận thông báo thành công." });
    } catch (error) {
      console.error("Lỗi đăng ký nhận thông báo:", error);
      res.status(500).json({ error: "Lỗi server" });
    }
  }
}
module.exports = new NotificationController();
