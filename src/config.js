const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite://';

const SPOTIFY_CALLBACK_URL = process.env.SPOTIFY_CALLBACK_URL || `http://localhost:${PORT}/callback`;
const SPOTIFY_SCOPES = process.env.SPOTIFY_SCOPES || [
  'user-read-private',
  'user-read-email',
].join(' ');

module.exports = {
  PORT,
  DATABASE_URL,
  SPOTIFY_CALLBACK_URL,
  SPOTIFY_SCOPES,
};
