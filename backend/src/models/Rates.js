const mongoose = require("mongoose");

const rateEntrySchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const vegetableRateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rates: {
    type: [rateEntrySchema],
    default: []
  }
});

module.exports = mongoose.model("VegetableRate", vegetableRateSchema);
