const express = require('express');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.get('/login', routes.login);
app.get('/callback', routes.callback);
app.get('/search', routes.search);

app.listen(config.PORT);

module.exports = app;
