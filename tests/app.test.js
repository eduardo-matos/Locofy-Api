const qs = require('querystring');
const url = require('url');
const { expect } = require('chai');
const client = require('./httpClient');
const config = require('../src/config');

describe('Login', () => {
  it('Redirects to Spotify with correct params', async () => {
    const resp = await client.get('/login');

    const query = qs.parse(url.parse(resp.redirects[0]).query);

    expect(query).to.have.property('client_id');
    expect(query).to.include({
      response_type: 'code',
      scope: config.SPOTIFY_SCOPES,
      redirect_uri: config.SPOTIFY_CALLBACK_URL,
    });
  });
});
