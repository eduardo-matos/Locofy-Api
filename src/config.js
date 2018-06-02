const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite://';

module.exports = {
  PORT,
  DATABASE_URL,
};
