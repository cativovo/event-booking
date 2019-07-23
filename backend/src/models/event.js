const mongoose = require('mongoose');
const User = require('./user');
const createRequiredField = require('../utils/createRequiredField');

const eventSchema = new mongoose.Schema({
  title: createRequiredField(String),
  description: createRequiredField(String),
  price: createRequiredField(Number),
  date: createRequiredField(Date),
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

eventSchema.methods.createEvent = async function createEvent() {
  const user = await User.findOne({ _id: '5d35e3f1ffbb1b503d7cbf83' });
  if (!user) {
    throw new Error('User not found');
  }

  this.creator = user._id;

  const event = await this.save();

  user.createdEvents.push(event._id);
  user.save();

  return event;
};

module.exports = mongoose.model('Event', eventSchema);

// Automatic nang magiging 'events'
// yung pangalan ng collection sa database
// ilolowercase ng mongoose + 's'
