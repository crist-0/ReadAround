const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },{
    id: true
  }

);

module.exports = mongoose.model("Comment", commentSchema);