const DataLoader = require('dataloader');
const Booking = require('../../models/booking');
const User = require('../../models/user');
const Event = require('../../models/event');
const checkAuth = require('../../utils/checkAuth');

const userLoader = new DataLoader(ids => User.find({ _id: { $in: ids } }));
const eventLoader = new DataLoader(ids => Event.find({ _id: { $in: ids } }));

const query = {
  bookings: async (args, { isAuth, userId }) => {
    checkAuth(isAuth);
    const bookings = await Booking.find({ user: userId });
    const bookingsWithCompleteData = bookings.map(async (booking) => {
      const user = await userLoader.load(booking.user.toString());
      const event = await eventLoader.load(booking.event.toString());
      return { ...booking._doc, user, event };
    });

    return Promise.all(bookingsWithCompleteData);
  },
};

const mutations = {
  bookEvent: async ({ eventId }, { isAuth, userId }) => {
    checkAuth(isAuth);
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    return new Booking({
      user: userId,
      event: event._id,
    }).save();
  },
  cancelBooking: async ({ bookingId }, { isAuth }) => {
    checkAuth(isAuth);
    const booking = await Booking.findOneAndDelete({ _id: bookingId });
    const event = await eventLoader.load(booking.event.toString());
    const user = await userLoader.load(booking.user.toString());
    event.creator = user;

    return { ...event._doc };
  },
};

module.exports = {
  ...query,
  ...mutations,
};
