const express = require('express');
const router = express.Router();

const {
  getPatients,
  createPatient
} = require('../controllers/patientController');

router.route('/')
  .get( getPatients)
  .post( createPatient);

module.exports = router;