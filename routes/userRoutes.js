const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getUserPosts
} = require('../controllers/userController');

const { protectApi } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/profile')
  .get(protectApi, getUserProfile)
  .put(protectApi, updateUserProfile);

router.get('/:id/posts', getUserPosts);

module.exports = router;
