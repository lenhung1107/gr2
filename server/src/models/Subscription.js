const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestUser", 
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
