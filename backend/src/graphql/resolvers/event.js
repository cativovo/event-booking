const Event = require('../../models/event');

module.exports = {
  events: () => Event.find().populate({
    path: 'creator',
    populate: {
      path: 'createdEvents',
    },
  }),
  createEvent: ({ eventInput: { date, price, ...rest } }) => new Event({
    date: new Date(date),
    price: parseFloat(price, 10),
    ...rest,
  }).createEvent(),
};
