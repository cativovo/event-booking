const Event = require('../../models/event');
const User = require('../../models/user');

const query = {
  events: () => Event.find().populate({
    path: 'creator',
    populate: {
      path: 'createdEvents',
    },
  }),
};

const mutation = {
  createEvent: async ({ eventInput: { date, price, ...rest } }) => {
    const user = await User.findById('5d35e3f1ffbb1b503d7cbf83'); // dummy user id
    if (!user) {
      throw new Error('User not found');
    }

    const event = await new Event({
      date: new Date(date),
      price: parseFloat(price, 10),
      creator: user._id,
      ...rest,
    }).save();

    user.createdEvents.push(event._id);
    await user.save();

    return event;
  },
};

module.exports = {
  ...query,
  ...mutation,
};
