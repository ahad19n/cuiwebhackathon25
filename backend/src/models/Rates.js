const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rate: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Optional: auto-expire entries older than 7 days
rateSchema.index({ date: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

module.exports = mongoose.model("Rate", rateSchema);
