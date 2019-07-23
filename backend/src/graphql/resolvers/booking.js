const Booking = require('../../models/booking');
const Event = require('../../models/event');
const checkAuth = require('../../utils/checkAuth');

const query = {
  bookings: (args, { isAuth }) => {
    checkAuth(isAuth);
    return Booking.find()
      .populate({
        path: 'event',
        populate: {
          path: 'creator',
        },
      })
      .populate('user');
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
    const { event } = await Booking.findOneAndDelete({ _id: bookingId }).populate({
      path: 'event',
      populate: {
        path: 'creator',
      },
    });

    return event;
  },
};

module.exports = {
  ...query,
  ...mutations,
};
