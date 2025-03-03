const express = require('express');
const router = express.Router();
const {
  addPantryStaff,
  getPantryStaff,
  assignTask,
  updateTaskStatus
} = require('../controllers/pantryController');


router.post('/staff',  addPantryStaff);

router.get('/staff',  getPantryStaff);

router.post('/tasks',  assignTask);

router.put('/tasks/:id/status', updateTaskStatus);

module.exports = router;