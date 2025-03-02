const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diseases: [String],
  allergies: [String],
  roomNumber: { type: String, required: true },
  bedNumber: String,
  floorNumber: String,
  age: Number,
  gender: String,
  contact: String,
  emergencyContact: String,
  dietChart: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);