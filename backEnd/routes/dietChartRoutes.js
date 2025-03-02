const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createDietChart,
  getDietCharts,
  updateDietChart,
  getDietChartByPatient,
  deleteDietChart
} = require('../controllers/dietChartController');

// @route   POST api/diet-charts
// @desc    Create new diet chart
// @access  Private
router.post('/', auth, createDietChart);

// @route   GET api/diet-charts
// @desc    Get all diet charts
// @access  Private
router.get('/', auth, getDietCharts);

// @route   GET api/diet-charts/patient/:patientId
// @desc    Get diet chart by patient
// @access  Private
router.get('/patient/:patientId', auth, getDietChartByPatient);

// @route   PUT api/diet-charts/:id
// @desc    Update diet chart
// @access  Private
router.put('/:id', auth, updateDietChart);

// @route   DELETE api/diet-charts/:id
// @desc    Delete diet chart
// @access  Private
router.delete('/:id', auth, deleteDietChart);

module.exports = router;