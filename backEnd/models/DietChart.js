const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  ingredients: [String],
  instructions: String,
  restrictions: [String]
});

const dietChartSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  morning: mealSchema,
  evening: mealSchema,
  night: mealSchema,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DietChart', dietChartSchema);