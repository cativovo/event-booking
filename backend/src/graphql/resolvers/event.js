const DataLoader = require('dataloader');
const Event = require('../../models/event');
const User = require('../../models/user');
const checkAuth = require('../../utils/checkAuth');

const userLoader = new DataLoader(ids => User.find({ _id: { $in: ids } }));
const eventLoader = new DataLoader(ids => Event.find({ _id: { $in: ids } }));

const query = {
  events: async () => {
    const events = await Event.find();

    const eventsCompleteData = events.map(async (event) => {
      const creator = await userLoader.load(event.creator.toString());
      const createdEvents = await eventLoader.loadMany(creator.createdEvents);
      creator.createdEvents = createdEvents;

      return { ...event._doc, creator };
    });

    return Promise.all(eventsCompleteData);
  },
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
