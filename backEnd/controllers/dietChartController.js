const DietChart = require('../models/DietChart');
const Patient = require('../models/Patient');


exports.createDietChart = async (req, res) => {
  const { patient, morning, evening, night } = req.body;
  const ss = patient;
  try {
    const patient = await Patient.findById(ss);
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    const newDietChart = new DietChart({
      patient: ss,
      morning,
      evening,
      night
    });

    const dietChart = await newDietChart.save();
    
    
    patient.dietChart = dietChart._id;
    await patient.save();

    res.json(dietChart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate('patient', 'name roomNumber');
    res.json(dietCharts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


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