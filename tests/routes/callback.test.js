const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const rp = require('request-promise');
const client = require('../httpClient');
const config = require('../../src/config');
const { toBase64 } = require('../../src/utils');
const { User } = require('../../src/models');

describe('Callback', () => {
  let request;
  const code = 'meat';
  const email = 'foo@bar.baz';
  const accessToken = 'spam';
  const refreshToken = 'egg';

  beforeEach(() => {
    request = client()
      .get('/callback')
      .query({ code })
      .redirects(0);

    rp
      .post
      .withArgs(config.SPOTIFY_FETCH_TOKEN_URL)
      .resolves({ access_token: accessToken, refresh_token: refreshToken });

    rp
      .get
      .withArgs(config.SPOTIFY_API_USER_PROFILE_URL)
      .resolves({ email });
  });

  it("Responds with Spotify's tokens", async () => {
    const resp = await request;

    const signedData = jwt.sign({ accessToken, refreshToken }, config.SECRET_KEY);
    expect(resp).to.have.header('Location', `${config.LOCOFY_FRONTEND_URL}?jwt=${signedData}`);
  });

  it("Sends error if Spotify's API (fetch token) rejects", async () => {
    rp.post.withArgs(config.SPOTIFY_FETCH_TOKEN_URL).rejects();

    const resp = await request;
    expect(resp).to.have.header('Location', `${config.LOCOFY_FRONTEND_URL}?e=1`);
  });

  it("Sends error if Spotify's API (fetch user) rejects", async () => {
    rp.get.withArgs(config.SPOTIFY_API_USER_PROFILE_URL).rejects();

    const resp = await request;
    expect(resp).to.have.header('Location', `${config.LOCOFY_FRONTEND_URL}?e=1`);
  });

  it('Sends correct params to Spotify API (fetch token)', async () => {
    await request;

    const [url, requestConfig] = rp.post.firstCall.args;

    expect(url).to.equal(config.SPOTIFY_FETCH_TOKEN_URL);
    expect(requestConfig).to.deep.equal({
      form: {
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.SPOTIFY_CALLBACK_URL,
      },
      headers: {
        Authorization: `Basic ${toBase64(`${config.SPOTIFY_CLIENT_ID}:${config.SPOTIFY_CLIENT_SECRET}`)}`
      },
      json: true
    });
  });

  it('Sends correct params to Spotify API (fetch user)', async () => {
    await request;

    const [url, requestConfig] = rp.get.firstCall.args;

    expect(url).to.equal(config.SPOTIFY_API_USER_PROFILE_URL);
    expect(requestConfig).to.deep.equal({
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      json: true
    });
  });

  it("Creates user if she doesn't exist", async () => {
    await request;

    const user = await User.findAll({ where: { email } });
    expect(user).to.have.lengthOf(1);
    expect(user[0].code).to.equal(code);
  });

  it("Doesn't create user if she already exists", async () => {
    await User.create({ email });

    await request;

    const user = await User.findAll({ where: { email } });
    expect(user).to.have.lengthOf(1);
  });

  it("Sends error if user can't be created", async () => {
    sinon.stub(User, 'create').rejects();

    const resp = await request;
    User.create.restore();

    expect(resp).to.have.header('Location', `${config.LOCOFY_FRONTEND_URL}?e=1`);
  });
});
