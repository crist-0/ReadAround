const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    dashboard_id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: Map, of: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("Dashboard", dashboardSchema);