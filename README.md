# Locofy API

[![Build Status](https://travis-ci.org/eduardo-matos/Locofy-Api.svg?branch=master)](https://travis-ci.org/eduardo-matos/Locofy-Api) [![Coverage Status](https://coveralls.io/repos/github/eduardo-matos/Locofy-Api/badge.svg?branch=master)](https://coveralls.io/github/eduardo-matos/Locofy-Api?branch=master)

API for [Locofy](https://github.com/eduardo-matos/Locofy).

## Commands

* `npm start`: Runs API.
* `npm test`: Runs tests.
* `npm run lint`: Run linter.

## Environment Variables

* `DATABASE_URL` (`sqlite://`): Database URL connection string. 
* `PORT` (`5000`): API port.
* `SECRET_KEY` (random): Secret key used to sign json web tokens.
* `SPOTIFY_SCOPES` (`user-read-private user-read-email`): Spotify scopes access.
* `SPOTIFY_CALLBACK_URL` (`http://localhost:${PORT}/callback`): Callback URL which Spotify will call upon authorization success or failure.
* `SPOTIFY_CLIENT_ID`: Application's client ID registered on Spotify.
* `SPOTIFY_CLIENT_SECRET`: Application's client secret registered on Spotify.
* `LOCOFY_FRONTEND_URL` (`https://localhost:3000`): URL to redirect user upon successful/failed authorization.
