const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createDelivery,
  getDeliveries,
  updateDeliveryStatus,
  assignDeliveryPerson
} = require('../controllers/deliveryController');

// @route   GET api/deliveries
// @desc    Get all deliveries
// @access  Private
router.get('/', auth, getDeliveries);

// @route   POST api/deliveries
// @desc    Create new delivery
// @access  Private
router.post('/', auth, createDelivery);

// @route   PUT api/deliveries/:id/status
// @desc    Update delivery status
// @access  Private
router.put('/:id/status', auth, updateDeliveryStatus);

// @route   PUT api/deliveries/:id/assign
// @desc    Assign delivery person
// @access  Private
router.put('/:id/assign', auth, assignDeliveryPerson);

module.exports = router;