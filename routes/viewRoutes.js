const express = require('express');
const {
  getHome,
  getLogin,
  getRegister,
  getDashboard,
  getCreatePost,
  getSinglePost,
  getProfile
} = require('../controllers/viewController');

const { requireAuth, checkUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply checkUser to all view routes to populate res.locals.user if logged in
router.use(checkUser);

router.get('/', getHome);
router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('/dashboard', requireAuth, getDashboard);
router.get('/create-post', requireAuth, getCreatePost);
router.get('/post/:id', getSinglePost);
router.get('/profile', requireAuth, getProfile);

module.exports = router;
