const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  mealType: { type: String, enum: ['morning', 'evening', 'night'], required: true },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'PantryStaff' },
  notes: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);