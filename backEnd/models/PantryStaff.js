const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['assigned', 'in-progress', 'completed', 'delayed'],
    default: 'assigned'
  },
  deadline: {
    type: Date,
    required: true
  },
  assignedAt: {
    type: Date,
    default: Date.now
  }
});

const pantryStaffSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    emergencyContact: {
      type: String,
      required: true
    }
  },
  tasks: [taskSchema],
  shift: {
    type: String,
    enum: ['morning', 'evening', 'night'],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
pantryStaffSchema.index({ user: 1 }, { unique: true });
pantryStaffSchema.index({ 'contact.phone': 1 }, { unique: true });

module.exports = mongoose.model('PantryStaff', pantryStaffSchema);