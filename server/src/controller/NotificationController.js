const Subscription = require("../models/Subscription");

class NotificationController {
  async subscribe(req, res) {
    try {
      const { userId, subscription } = req.body;

      if (!userId || !subscription) {
        return res
          .status(400)
          .json({ message: "Thiếu userId hoặc subscription" });
      }
      await Subscription.deleteMany({ userId });
      await Subscription.create({ userId, ...subscription });

      res.status(201).json({ message: "Đăng ký thông báo thành công" });
    } catch (error) {
      console.error("Lỗi khi lưu subscription:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
  async getUserNotifications(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "Thiếu userId" });
      }

      const notis = await Notification.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(notis);
    } catch (error) {
      console.error("Lỗi khi lấy thông báo:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}
module.exports = new NotificationController();
