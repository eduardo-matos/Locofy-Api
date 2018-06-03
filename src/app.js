const express = require('express');
const config = require('./config');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

app.get('/login', routes.login);
app.get('/callback', routes.callback);
app.get('/search', [
  middlewares.allowAjax,
  middlewares.spotifyAuth
], routes.search);

app.listen(config.PORT);

module.exports = app;
