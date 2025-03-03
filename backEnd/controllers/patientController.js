const Patient = require('../models/Patient')
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('dietChart');
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.createPatient = async (req, res) => {
  const { name, roomNumber, diseases, allergies } = req.body;

  try {
    const newPatient = new Patient({
      name,
      roomNumber,
      diseases,
      allergies
    });

    const patient = await newPatient.save();
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};