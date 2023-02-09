'use strict';

const express = require('express');
const app = express();

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

require('./mongo/connect'); // db connect

app.use(express.json({ limit: '900kb' }));
app.use(express.urlencoded({ extended: true, limit: '900kb' }));
app.use(express.raw({ type: 'application/json', limit: '900kb', extended: true }));

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  require('./routes/index')(app);
  next();
});

const port = 3000;
app.listen(port, () => console.log(`Server ready! Listening on port ${port}`));

process.on('uncaughtException', (error) => {
  console.log(`${new Date().toUTCString()} uncaught exception: \n${error}`);
  process.exit(1);
});