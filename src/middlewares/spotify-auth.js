const jwt = require('jsonwebtoken');
const Http = require('http-codes');
const config = require('../config');

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization && req.headers.authorization.split(' ')[1];

  jwt.verify(authToken, config.SECRET_KEY, (err, data) => {
    if (err) {
      res.status(Http.BAD_REQUEST);
      res.json({ msg: 'Invalid authorization code' });
    } else {
      req.spotify = data;
      next();
    }
  });
};
