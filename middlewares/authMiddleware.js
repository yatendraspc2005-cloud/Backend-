const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectApi = async (req, res, next) => {
  let token;

  if (req.cookies.jwt && req.cookies.jwt !== 'none') {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token && token !== 'none') {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        res.locals.user = null;
        return res.redirect('/login');
      }
      req.user = user;
      res.locals.user = user;
      next();
    } catch (err) {
      res.locals.user = null;
      res.redirect('/login');
    }
  } else {
    res.locals.user = null;
    res.redirect('/login');
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token && token !== 'none') {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      res.locals.user = user;
      next();
    } catch (err) {
      res.locals.user = null;
      next();
    }
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { protectApi, requireAuth, checkUser };
