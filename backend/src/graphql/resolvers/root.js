const eventResolver = require('./event');
const userResolver = require('./user');
const bookingResolver = require('./booking');

module.exports = {
  ...bookingResolver,
  ...eventResolver,
  ...userResolver,
};
