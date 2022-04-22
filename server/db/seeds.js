const mongoose = require('mongoose');
const UserModel = require('../models/user-model');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Seeding database...');
}).catch((e) => {
  console.log(e);
});

const seedUsers = [
  {
    username: "test1",
    email: "user@gmail.com",
    password: "a36c076a267f8fe575cb4023163945f6",
    role: "user"
  },
  {
    username: "test2",
    email: "admin@gmail.com",
    password: "92a077aa57a73374705a5b757df23e50",
    role: "admin"
  }
];

const seedDB = async () => {
  const data = await UserModel.find();

  if (data.length) {
    return;
  }

  await UserModel.deleteMany({});
  await UserModel.insertMany(seedUsers);
};

seedDB().then(() => {
  mongoose.connection.close();
});