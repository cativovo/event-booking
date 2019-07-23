const Booking = require('../../models/booking');
const Event = require('../../models/event');

const query = {
  bookings: () => Booking.find()
    .populate({
      path: 'event',
      populate: {
        path: 'creator',
      },
    })
    .populate('user'),
};

const mutations = {
  bookEvent: async ({ eventId }) => {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    return new Booking({
      user: '5d35e3f1ffbb1b503d7cbf83',
      event: event._id,
    }).save();
  },
  cancelBooking: async ({ bookingId }) => {
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
