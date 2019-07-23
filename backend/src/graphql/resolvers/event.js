const Event = require('../../models/event');
const User = require('../../models/user');
const checkAuth = require('../../utils/checkAuth');

const query = {
  events: () => Event.find().populate({
    path: 'creator',
    populate: {
      path: 'createdEvents',
    },
  }),
};

const mutation = {
  createEvent: async ({ eventInput: { date, price, ...rest } }, { isAuth, userId }) => {
    checkAuth(isAuth);
    const user = await User.findById(userId);
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
