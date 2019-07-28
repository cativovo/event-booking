const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      req.isAuth = false;
      next();
      return;
    }

    const token = authHeader.split(' ')[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ tokens: token });

    if (!user) {
      req.isAuth = false;
      next();
      return;
    }

    req.userId = userId;
    req.isAuth = true;
    req.token = token;
    next();
  } catch (e) {
    req.isAuth = false;
    next();
  }
};
