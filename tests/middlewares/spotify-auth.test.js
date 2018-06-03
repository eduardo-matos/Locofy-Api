const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const Http = require('http-codes');
const config = require('../../src/config');
const { spotifyAuth } = require('../../src/middlewares');

describe('Middleware Spotify Auth', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { headers: { authorization: `Bearer ${jwt.sign({ spam: 1 }, config.SECRET_KEY)}` } };
    res = { status: sinon.spy(), json: sinon.spy() };
    next = sinon.spy();
  });

  it('Fills request with token data', () => {
    spotifyAuth(req, res, next);

    expect(req.spotify).to.include({ spam: 1 });
    expect(next.callCount).to.equal(1);
  });

  it("Sends error if token can't be decoded", () => {
    req.headers.authorization = 'Bearer spam';
    spotifyAuth(req, res, next);

    expect(req.spotify).to.be.undefined;
    expect(next.called).to.be.false;
    expect(res.status.firstCall.args).to.deep.equal([Http.BAD_REQUEST]);
    expect(res.json.firstCall.args).to.deep.equal([{ msg: 'Invalid authorization code' }]);
  });

  it('Sends error if there is no authorization header', () => {
    delete req.headers.authorization;
    spotifyAuth(req, res, next);

    expect(req.spotify).to.be.undefined;
    expect(next.called).to.be.false;
    expect(res.status.firstCall.args).to.deep.equal([Http.BAD_REQUEST]);
    expect(res.json.firstCall.args).to.deep.equal([{ msg: 'Invalid authorization code' }]);
  });
});
