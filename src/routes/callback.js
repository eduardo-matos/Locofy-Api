const jwt = require('jsonwebtoken');
const qs = require('querystring');
const logger = require('../logger');
const spotify = require('../spotify');
const { User } = require('../models');
const config = require('../config');

const ERROR_URL = `${config.LOCOFY_FRONTEND_URL}?e=1`;

module.exports = async (req, res) => {
  let accessToken;
  let email;

  try {
    accessToken = await spotify.fetchToken(req.query.code);
  } catch (err) {
    // Probably user didn't provide access
    logger.error('Error fetching token from spotify', err.stack);
    return res.redirect(ERROR_URL);
  }

  try {
    email = await spotify.fetchUserEmail(accessToken);
  } catch (err) {
    logger.error('Error fetching user data from spotify', err.stack);
    return res.redirect(ERROR_URL);
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    try {
      await User.create({ email, code: req.query.code });
    } catch (err) {
      logger.error('Error creating user on database', err.stack);
      return res.redirect(ERROR_URL);
    }
  }

  const data = jwt.sign({ accessToken }, config.SECRET_KEY);
  return res.redirect(`${config.LOCOFY_FRONTEND_URL}?${qs.stringify({ jwt: data })}`);
};

