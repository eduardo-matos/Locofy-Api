const { db } = require('../src/models');
const sinon = require('sinon');
const rp = require('request-promise');
const config = require('../src/config');

config.SPOTIFY_CLIENT_ID = `${Math.random()}`;
config.SPOTIFY_CLIENT_SECRET = `${Math.random()}`;

before(() => db.sync());
beforeEach(() => db.truncate());

beforeEach(() => sinon.stub(rp, 'get'));
afterEach(() => rp.get.restore());
beforeEach(() => sinon.stub(rp, 'post'));
afterEach(() => rp.post.restore());
