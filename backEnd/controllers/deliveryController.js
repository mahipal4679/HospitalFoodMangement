const Delivery = require('../models/Delivery');
const Patient = require('../models/Patient');
const PantryStaff = require('../models/PantryStaff');

// @desc    Get all deliveries
exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate('patient', 'name roomNumber')
      .populate('deliveryPerson', 'name contact');
    res.json(deliveries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create new delivery
exports.createDelivery = async (req, res) => {
  const { patientId, mealType } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });

    const newDelivery = new Delivery({
      patient: patientId,
      mealType
    });

    const delivery = await newDelivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!delivery) return res.status(404).json({ msg: 'Delivery not found' });

    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Assign delivery person
exports.assignDeliveryPerson = async (req, res) => {
  const { deliveryPersonId } = req.body;

  try {
    const deliveryPerson = await PantryStaff.findById(deliveryPersonId);
    if (!deliveryPerson) return res.status(404).json({ msg: 'Staff not found' });

    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { deliveryPerson: deliveryPersonId },
      { new: true }
    );

    if (!delivery) return res.status(404).json({ msg: 'Delivery not found' });

    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};