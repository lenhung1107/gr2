const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "TestUser",
    required: true,
  },
  title: String,
  body: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);
