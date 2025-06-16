const webpush = require("../config/webpush"); // hoặc đúng path tới file config của bạn
const Subscription = require("../models/Subscription");
const Notification = require("../models/Notification");
async function sendNotificationToUser(userId, payloadData) {
  const subscriptions = await Subscription.find({ userId });

  const payload = JSON.stringify(payloadData);

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (err) {
      console.error("Lỗi khi gửi thông báo:", err);
    }
  }
  await Notification.create({
    userId,
    title: payloadData.title,
    body: payloadData.body,
  });
}

module.exports = sendNotificationToUser;
