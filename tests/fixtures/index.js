const albums = require('./albums');
const tracks = require('./tracks');
const artists = require('./artists');

const searchAlbums = require('./search-albums');
const searchTracks = require('./search-tracks');
const searchArtists = require('./search-artists');

module.exports = {
  albums,
  tracks,
  artists,

  searchAlbums,
  searchTracks,
  searchArtists,
};
