const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    spoiler_id: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { 
    id: true 
});

module.exports = mongoose.model("Review", reviewSchema);