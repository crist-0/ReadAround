const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
    recommendation_id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    created_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("recommendation", recommendationSchema);