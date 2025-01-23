const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
  cover_image: { type: String },
  publication_date: { type: Date },
  number_of_reviews: { type: Number, default: 0 },
  average_rating: { type: Number, default: 0 },
});

// Define a virtual field `book_id` to use `_id` in a user-friendly way
bookSchema.virtual("book_id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are included in JSON and Object output
bookSchema.set("toJSON", { virtuals: true });
bookSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Book", bookSchema);
