const Http = require('http-codes');
const spotify = require('../spotify');

const SEARCH_TYPE_MAPPING = {
  track: spotify.searchTrack,
  artist: spotify.searchArtist,
  album: spotify.searchAlbum,
};

module.exports = async (req, res) => {
  const searchFunc = SEARCH_TYPE_MAPPING[req.query.type];
  const { term } = req.query;

  if (!searchFunc) {
    return res.status(Http.BAD_REQUEST).json({ msg: 'Invalid type' });
  }

  if (!term) {
    return res.status(Http.BAD_REQUEST).json({ msg: 'Invalid term' });
  }

  try {
    return res.json(await searchFunc(term, req.spotify.accessToken));
  } catch (e) {
    return res.status(Http.UNAUTHORIZED).json({ msg: 'Problem accessing Spotify' });
  }
};
