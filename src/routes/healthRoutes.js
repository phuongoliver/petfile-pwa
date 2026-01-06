const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const authenticate = require('../middleware/auth');

router.get('/:petId', authenticate, healthController.getHealthLogsByPet);
router.post('/', authenticate, healthController.createHealthLog);

module.exports = router;
