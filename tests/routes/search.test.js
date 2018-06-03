const { expect } = require('chai');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const Http = require('http-codes');
const client = require('../httpClient');
const config = require('../../src/config');
const fixtures = require('../fixtures');

describe('Search', () => {
  const token = jwt.sign({ token: 'baz' }, config.SECRET_KEY);

  it('Allows ajax requests', async () => {
    rp.get.resolves(fixtures.tracks);
    const resp = await client()
      .get('/search')
      .query({ type: 'track', term: 'foo' })
      .set('Authorization', `Bearer ${token}`);

    expect(resp).to.have.header('Access-Control-Allow-Origin', '*');
  });

  it('Tracks', async () => {
    rp.get.resolves(fixtures.tracks);
    const resp = await client()
      .get('/search')
      .query({ type: 'track', term: 'foo' })
      .set('Authorization', `Bearer ${token}`);

    expect(resp.body).to.deep.equal(fixtures.searchTracks);
  });

  it('Albums', async () => {
    rp.get.resolves(fixtures.albums);
    const resp = await client()
      .get('/search')
      .query({ type: 'album', term: 'foo' })
      .set('Authorization', `Bearer ${token}`);

    expect(resp.body).to.deep.equal(fixtures.searchAlbums);
  });

  it('Artists', async () => {
    rp.get.resolves(fixtures.artists);
    const resp = await client()
      .get('/search')
      .query({ type: 'artist', term: 'foo' })
      .set('Authorization', `Bearer ${token}`);

    expect(resp.body).to.deep.equal(fixtures.searchArtists);
  });

  it('Sends error if type is unknown', (done) => {
    client()
      .get('/search')
      .query({ type: 'wtf', term: 'foo' })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(Http.BAD_REQUEST);
        expect(res.body).to.deep.equal({ msg: 'Invalid type' });

        done();
      });
  });

  it('Sends error if term is missing', (done) => {
    client()
      .get('/search')
      .query({ type: 'track', term: '' })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(Http.BAD_REQUEST);
        expect(res.body).to.deep.equal({ msg: 'Invalid term' });

        done();
      });
  });

  it('Sends error if auth header is wrong', (done) => {
    client()
      .get('/search')
      .query({ type: 'track', term: 'foo' })
      .set('Authorization', 'Bearer wtf')
      .end((err, res) => {
        expect(res).to.have.status(Http.BAD_REQUEST);
        expect(res.body).to.deep.equal({ msg: 'Invalid authorization code' });

        done();
      });
  });

  it('Sends error if auth header is missing', (done) => {
    client()
      .get('/search')
      .query({ type: 'track', term: 'foo' })
      .end((err, res) => {
        expect(res).to.have.status(Http.BAD_REQUEST);
        expect(res.body).to.deep.equal({ msg: 'Invalid authorization code' });

        done();
      });
  });

  it("Sends error Spotify's API rejects", (done) => {
    rp.get.rejects({});

    client()
      .get('/search')
      .query({ type: 'track', term: 'foo' })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(Http.UNAUTHORIZED);
        expect(res.body).to.deep.equal({ msg: 'Problem accessing Spotify' });

        done();
      });
  });
});
