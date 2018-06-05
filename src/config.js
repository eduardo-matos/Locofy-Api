const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite://';
const SECRET_KEY = process.env.SECRET_KEY || `${Math.random()}`;
const { LOG_LEVEL } = process.env;

const LOCOFY_FRONTEND_URL = process.env.LOCOFY_FRONTEND_URL || 'https://localhost:3000';

const SPOTIFY_API_GENERAL_SEARCH_URL = 'https://api.spotify.com/v1/search';
const SPOTIFY_API_SINGLE_ARTIST_URL = 'https://api.spotify.com/v1/artists/';
const SPOTIFY_API_USER_PROFILE_URL = 'https://api.spotify.com/v1/me';

const SPOTIFY_FETCH_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_REFRESH_TOKEN_URL = SPOTIFY_FETCH_TOKEN_URL;
const { SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_ID } = process.env;
const SPOTIFY_CALLBACK_URL = process.env.SPOTIFY_CALLBACK_URL || `http://localhost:${PORT}/callback`;
const SPOTIFY_SCOPES = process.env.SPOTIFY_SCOPES || [
  'user-read-private',
  'user-read-email',
].join(' ');

module.exports = {
  PORT,
  DATABASE_URL,
  SECRET_KEY,
  LOG_LEVEL,

  LOCOFY_FRONTEND_URL,

  SPOTIFY_API_GENERAL_SEARCH_URL,
  SPOTIFY_API_SINGLE_ARTIST_URL,
  SPOTIFY_API_USER_PROFILE_URL,

  SPOTIFY_REFRESH_TOKEN_URL,
  SPOTIFY_FETCH_TOKEN_URL,
  SPOTIFY_CALLBACK_URL,
  SPOTIFY_SCOPES,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
};
