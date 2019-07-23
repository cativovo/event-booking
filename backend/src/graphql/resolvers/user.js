const User = require('../../models/user');

module.exports = {
  createUser: ({ userInput }) => new User(userInput).save(),
};
