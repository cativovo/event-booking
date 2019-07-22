const path = require('path');
const fs = require('fs');
const app = require('./app');

const envPath = path.join(__dirname, '..', 'config', 'event-booking.env');

if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
