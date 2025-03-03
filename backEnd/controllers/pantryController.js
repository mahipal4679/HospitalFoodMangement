const PantryStaff = require('../models/PantryStaff');

exports.addPantryStaff = async (req, res) => {
  const { name, contact, role } = req.body;

  try {
    const newStaff = new PantryStaff({
      name,
      contact,
      role
    });

    const staff = await newStaff.save();
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPantryStaff = async (req, res) => {
  try {
    const staff = await PantryStaff.find();
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.assignTask = async (req, res) => {
  const { staffId, taskDescription, deadline } = req.body;

  try {
    const staff = await PantryStaff.findById(staffId);
    if (!staff) return res.status(404).json({ msg: 'Staff member not found' });

    staff.tasks.push({
      description: taskDescription,
      deadline,
      status: 'assigned'
    });

    await staff.save();
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const staff = await PantryStaff.findOneAndUpdate(
      { 'tasks._id': taskId },
      { $set: { 'tasks.$.status': status } },
      { new: true }
    );

    if (!staff) return res.status(404).json({ msg: 'Task not found' });

    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};