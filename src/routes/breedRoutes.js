const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController'); // reusing the controller is fine
const authenticate = require('../middleware/auth');

router.get('/:breed', authenticate, communityController.getBreedInfo);

module.exports = router;
