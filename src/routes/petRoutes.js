const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, petController.getPets);
router.get('/:id', authenticate, petController.getPetById);
router.post('/', authenticate, petController.createPet);
router.delete('/:id', authenticate, petController.deletePet);

module.exports = router;
