const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to check if current cookie has a valid verified token
const hasValidToken = (req) => {
  const token = req.cookies.jwt;
  if (!token || token === 'none') return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};

exports.getHome = (req, res) => {
  res.render('pages/home');
};

exports.getLogin = (req, res) => {
  if (hasValidToken(req)) {
    return res.redirect('/dashboard');
  }
  res.render('pages/login');
};

exports.getRegister = (req, res) => {
  if (hasValidToken(req)) {
    return res.redirect('/dashboard');
  }
  res.render('pages/register');
};

exports.getDashboard = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'name email').sort('-createdAt');
    res.render('pages/dashboard', { posts, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.getCreatePost = (req, res) => {
  res.render('pages/createPost');
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email bio')
      .populate('comments.user', 'name');
      
    if (!post) {
      return res.status(404).send('<h2 style="font-family:sans-serif;text-align:center;margin-top:80px;color:#ef4444">404 - Post Not Found</h2><p style="text-align:center"><a href="/dashboard">Go back</a></p>');
    }
    res.render('pages/post', { post });
  } catch (err) {
    // Handle invalid ObjectId format gracefully
    if (err.name === 'CastError') {
      return res.status(404).send('<h2 style="font-family:sans-serif;text-align:center;margin-top:80px;color:#ef4444">404 - Post Not Found</h2><p style="text-align:center"><a href="/dashboard">Go back</a></p>');
    }
    next(err);
  }
};

exports.getProfile = (req, res) => {
  res.render('pages/profile', { user: req.user });
};
