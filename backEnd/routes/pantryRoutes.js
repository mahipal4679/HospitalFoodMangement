const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addPantryStaff,
  getPantryStaff,
  assignTask,
  updateTaskStatus
} = require('../controllers/pantryController');

// @route   POST api/pantry/staff
// @desc    Add pantry staff
// @access  Private (Admin only)
router.post('/staff', auth, addPantryStaff);

// @route   GET api/pantry/staff
// @desc    Get all pantry staff
// @access  Private
router.get('/staff', auth, getPantryStaff);

// @route   POST api/pantry/tasks
// @desc    Assign preparation task
// @access  Private
router.post('/tasks', auth, assignTask);

// @route   PUT api/pantry/tasks/:id/status
// @desc    Update task status
// @access  Private
router.put('/tasks/:id/status', auth, updateTaskStatus);

module.exports = router;