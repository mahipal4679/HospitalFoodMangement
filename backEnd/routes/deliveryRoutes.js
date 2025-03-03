const express = require('express');
const router = express.Router();

const {
  createDelivery,
  getDeliveries,
  updateDeliveryStatus,
  assignDeliveryPerson
} = require('../controllers/deliveryController');


router.get('/', getDeliveries);

router.post('/', createDelivery);

router.put('/:id/status', updateDeliveryStatus);

router.put('/:id/assign', assignDeliveryPerson);

module.exports = router;