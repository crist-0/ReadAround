const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment_id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("Comment", commentSchema);