/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  tokens: {
    type: [String],
    select: false,
  },
});

userSchema.pre('save', async function hashPassword() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.tokens = [jwt.sign({ userId: this._id }, process.env.JWT_SECRET)];
  }
});

userSchema.post('save', (user) => {
  user.password = null;

  if (user.tokens) {
    [user.token] = user.tokens;
    user.userId = user._id;
  }
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

userSchema.methods.generateToken = async function generateToken() {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET);

  await this.model('User').updateOne({ _id: this._id }, { $push: { tokens: token } });

  return { token, userId: this._id };
};

module.exports = mongoose.model('User', userSchema);
