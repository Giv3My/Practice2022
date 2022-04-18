const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB was connected');
}).catch((e) => {
  console.log(e);
});

module.exports = mongoose.connection;
