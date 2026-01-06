const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const authenticate = require('../middleware/auth');

// Remove breed-info from here
router.get('/:breed', authenticate, communityController.getCommunityPosts);
router.post('/', authenticate, communityController.createPost);

module.exports = router;
