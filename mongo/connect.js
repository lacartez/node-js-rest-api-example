'use strict';

const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.set('strictQuery', false);

const connectOptions  = {
  maxPoolSize: 110,
  socketTimeoutMS: 1000,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true
};

mongoose.connect(process.env.MONGODB_URI, connectOptions, (error) => {
  if (error) {
    console.log(`Database connection failed: \n${error}`);
    process.exit(1);
  }

  console.log('Database connection successful');
});
