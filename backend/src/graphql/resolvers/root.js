const eventResolver = require('./event');
const authResolver = require('./auth');
const bookingResolver = require('./booking');

module.exports = {
  ...bookingResolver,
  ...eventResolver,
  ...authResolver,
};
