const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getPatients,
  createPatient
} = require('../controllers/patientController');

router.route('/')
  .get(auth, getPatients)
  .post(auth, createPatient);

module.exports = router;