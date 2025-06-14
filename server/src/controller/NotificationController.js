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
}
module.exports = new NotificationController();
