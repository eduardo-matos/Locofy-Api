const { expect } = require('chai');
const { toBase64 } = require('../src/utils');

describe('Utils', () => {
  it('To base 64', () => {
    expect(toBase64('foo bar')).to.equal(Buffer.from('foo bar').toString('base64'));
  });
});
