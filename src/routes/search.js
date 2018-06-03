const Http = require('http-codes');
const jwt = require('jsonwebtoken');
const config = require('../config');
const spotify = require('../spotify');

const SEARCH_TYPE_MAPPING = {
  track: spotify.searchTrack,
  artist: spotify.searchArtist,
  album: spotify.searchAlbum,
};

module.exports = async (req, res) => {
  const searchFunc = SEARCH_TYPE_MAPPING[req.query.type];
  const { term } = req.query;

  const auth = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!searchFunc) {
    return res.status(Http.BAD_REQUEST).json({ msg: 'Invalid type' });
  }

  if (!term) {
    return res.status(Http.BAD_REQUEST).json({ msg: 'Invalid term' });
  }

  return jwt.verify(auth, config.SECRET_KEY, async (err, data) => {
    if (err) {
      res.status(Http.BAD_REQUEST).json({ msg: 'Invalid authorization code' });
    } else {
      try {
        res.json(await searchFunc(term, data.token));
      } catch (e) {
        res.status(Http.UNAUTHORIZED).json({ msg: 'Problem accessing Spotify' });
      }
    }
  });
};
