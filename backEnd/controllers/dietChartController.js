const DietChart = require('../models/DietChart');
const Patient = require('../models/Patient');

// @desc    Create new diet chart
exports.createDietChart = async (req, res) => {
  const { patientId, morning, evening, night } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    const newDietChart = new DietChart({
      patient: patientId,
      morning,
      evening,
      night
    });

    const dietChart = await newDietChart.save();
    
    // Update patient's diet chart reference
    patient.dietChart = dietChart._id;
    await patient.save();

    res.json(dietChart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all diet charts
exports.getDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate('patient', 'name roomNumber');
    res.json(dietCharts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get diet chart by patient
exports.getDietChartByPatient = async (req, res) => {
  try {
    const dietChart = await DietChart.findOne({ patient: req.params.patientId })
      .populate('patient', 'name roomNumber');

    if (!dietChart) return res.status(404).json({ msg: 'Diet chart not found' });

    res.json(dietChart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update diet chart
exports.updateDietChart = async (req, res) => {
  const { morning, evening, night } = req.body;

  try {
    const dietChart = await DietChart.findByIdAndUpdate(
      req.params.id,
      { morning, evening, night },
      { new: true }
    ).populate('patient', 'name roomNumber');

    if (!dietChart) return res.status(404).json({ msg: 'Diet chart not found' });

    res.json(dietChart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete diet chart
exports.deleteDietChart = async (req, res) => {
  try {
    const dietChart = await DietChart.findById(req.params.id);
    if (!dietChart) return res.status(404).json({ msg: 'Diet chart not found' });

    await dietChart.remove();
    res.json({ msg: 'Diet chart removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};