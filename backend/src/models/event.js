const mongoose = require('mongoose');
const createRequiredField = require('../utils/createRequiredField');

const eventSchema = new mongoose.Schema({
  title: createRequiredField(String),
  description: createRequiredField(String),
  price: createRequiredField(Number),
  date: createRequiredField(Date),
});

module.exports = mongoose.model('Event', eventSchema);

// Automatic nang magiging 'events'
// yung pangalan ng collection sa database
// ilolowercase ng mongoose + 's'
