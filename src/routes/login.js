const config = require('../config');

module.exports = (req, res) => {
  const scopes = encodeURIComponent(config.SPOTIFY_SCOPES);
  const callbackUrl = encodeURIComponent(config.SPOTIFY_CALLBACK_URL);

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
    'response_type=code&' +
    `client_id=${config.SPOTIFY_CLIENT_ID}&` +
    `scope=${scopes}&` +
    `redirect_uri=${callbackUrl}`
  );
};
