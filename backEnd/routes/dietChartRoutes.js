const express = require('express');
const router = express.Router();
const {
  createDietChart,
  getDietCharts,
  updateDietChart,
  getDietChartByPatient,
  deleteDietChart
} = require('../controllers/dietChartController');

router.post('/', createDietChart);

router.get('/', getDietCharts);

router.get('/patient/:patientId', getDietChartByPatient);

router.put('/:id', updateDietChart);

router.delete('/:id', deleteDietChart);

module.exports = router;