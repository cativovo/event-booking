const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const createRequiredField = require('../utils/createRequiredField');

const userSchema = new mongoose.Schema({
  email: {
    ...createRequiredField(String),
    trim: true,
    unique: true,
    validate(email) {
      if (!isEmail(email)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    ...createRequiredField(String),
    trim: true,
    minlength: 4,
    select: false,
  },
  createdEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

userSchema.pre('save', async function hashPassword() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.post('save', (user) => {
  // eslint-disable-next-line no-param-reassign
  user.password = null;
});

// will only be called if there's an error in saving the user
// there is a special kind of post middleware called
// "error handling middleware" that executes specifically when an error occurs
userSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email already exists'));
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
