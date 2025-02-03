const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  bio: { type: String },
  profile_picture: { type: String },
  saved_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  favorite_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
},{ 
  id: true 
});

module.exports = mongoose.model('User', userSchema);
