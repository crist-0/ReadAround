const mongoose = require("mongoose");

const socialConnectionSchema = new mongoose.Schema({
    connection_id: { type: String, required: true, unique: true },
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model("SocialConnection",socialConnectionSchema);