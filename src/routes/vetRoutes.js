const express = require('express');
const router = express.Router();
const vetController = require('../controllers/vetController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, vetController.getVets);

module.exports = router;
