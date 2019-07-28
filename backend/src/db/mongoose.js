const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = connect;
