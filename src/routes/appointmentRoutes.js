const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticate = require('../middleware/auth');

router.get('/:petId', authenticate, appointmentController.getAppointmentsByPet);
router.post('/', authenticate, appointmentController.createAppointment);

module.exports = router;
