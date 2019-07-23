const eventResolver = require('./event');
const userResolver = require('./user');

module.exports = {
  ...eventResolver,
  ...userResolver,
};
