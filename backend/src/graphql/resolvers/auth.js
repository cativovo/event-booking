const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const query = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ email }).select('password');

    if (!user) {
      throw new Error('Invalid user or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid user or password.');
    }

    const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET);

    return { userId: user.id, token };
  },
};

const mutation = {
  createUser: ({ userInput }) => new User(userInput).save(),
};

module.exports = {
  ...query,
  ...mutation,
};
