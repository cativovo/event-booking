const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      req.isAuth = false;
      next();
      return;
    }

    const token = authHeader.split(' ')[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = userId;
    req.isAuth = true;
    next();
  } catch (e) {
    req.isAuth = false;
    next();
  }
};
