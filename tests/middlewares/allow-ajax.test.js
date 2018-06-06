const sinon = require('sinon');
const { expect } = require('chai');
const { allowAjax } = require('../../src/middlewares');

describe('Middleware Allow Ajax', () => {
  it('Sends header', () => {
    const req = {};
    const res = { header: sinon.spy() };
    const next = sinon.spy();

    allowAjax(req, res, next);

    expect(res.header.callCount).to.equal(2);
    expect(res.header.firstCall.args).to.deep.equal(['Access-Control-Allow-Origin', '*']);
    expect(res.header.secondCall.args).to.deep.equal(['Access-Control-Allow-Headers', 'Authorization']);

    expect(next.callCount).to.equal(1);
  });
});
