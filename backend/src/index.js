require('./dotenv');
const app = require('./app');
const connect = require('./db/mongoose');

const { PORT } = process.env;

connect
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port ${PORT}`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(e => console.log(e));
