const express = require('express');
const config = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send('spam');
});

app.listen(config.PORT);

module.exports = app;
