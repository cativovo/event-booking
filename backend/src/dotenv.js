const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '..', 'config', 'event-booking.env');

if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}
