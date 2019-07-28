const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const checkAuth = require('../../utils/checkAuth');

const query = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ email }).select('password');

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    const { token } = await user.generateToken();

    return { userId: user.id, token };
  },
};

const mutation = {
  createUser: ({ userInput }) => new User(userInput).save(),
  logout: async (args, { isAuth, token, userId }) => {
    checkAuth(isAuth);

    const { nModified } = await User.updateOne({ _id: userId }, { $pull: { tokens: token } });

    return { result: !!nModified };
  },
};

module.exports = {
  ...query,
  ...mutation,
};
