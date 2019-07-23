const mongoose = require('mongoose');
const createRequiredField = require('../utils/createRequiredField');

const bookingSchema = new mongoose.Schema(
  {
    event: {
      ...createRequiredField(mongoose.Schema.Types.ObjectId),
      ref: 'Event',
    },
    user: {
      ...createRequiredField(mongoose.Schema.Types.ObjectId),
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Booking', bookingSchema);
