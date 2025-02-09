const mongoose = require("mongoose");

const socialConnectionSchema = new mongoose.Schema({
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now }
},
{ 
  id: true 
});

socialConnectionSchema.index({ follower_id: 1, followed_id: 1 }, { unique: true });

module.exports = mongoose.model("SocialConnection", socialConnectionSchema);
