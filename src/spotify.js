const rp = require('request-promise');
const config = require('./config');
const { toBase64 } = require('./utils');

module.exports.fetchToken = async (code) => {
  const resp = await rp.post(config.SPOTIFY_FETCH_TOKEN_URL, {
    form: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.SPOTIFY_CALLBACK_URL,
    },
    headers: {
      Authorization: `Basic ${toBase64(`${config.SPOTIFY_CLIENT_ID}:${config.SPOTIFY_CLIENT_SECRET}`)}`
    },
    json: true,
  });

  return resp.access_token;
};

module.exports.fetchUserEmail = async (token) => {
  const resp = await rp.get(config.SPOTIFY_API_USER_PROFILE_URL, requestConfig(token));
  return resp.email;
};

module.exports.searchAlbum = async (term, accessToken) => {
  const resp = await search(term, 'album', accessToken);

  return resp.albums.items.map(album => ({
    id: album.id,
    image: album.images[0].url,
    name: album.name,
    artists: album.artists.map(artist => artist.name),
    availability: true,
  }));
};

module.exports.searchArtist = async (term, accessToken) => {
  const resp = await search(term, 'artist', accessToken);

  return resp.artists.items.map(artist => ({
    id: artist.id,
    name: artist.name,
    image: artist.images.length ? artist.images[0].url : '',
    genres: artist.genres,
    popularity: artist.popularity,
  }));
};

module.exports.searchTrack = async (term, accessToken) => {
  const resp = await search(term, 'track', accessToken);

  return resp.tracks.items.map(track => ({
    name: track.name,
    image: track.album.images[0].url,
    duration_ms: track.duration_ms,
    album: track.album.name,
    artists: track.artists.map(artist => artist.name),
  }));
};

function search(term, type, accessToken) {
  return rp.get(config.SPOTIFY_API_GENERAL_SEARCH_URL, {
    qs: {
      q: term,
      type,
    },
    ...requestConfig(accessToken),
  });
}

function requestConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true,
  };
}
