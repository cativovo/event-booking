const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports = connect;
