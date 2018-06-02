const { expect } = require('chai');
const client = require('./httpClient');

it('Works', async () => {
  const resp = await client.get('/');

  expect(resp).to.have.status(200);
  expect(resp.text).to.equal('spam');
});
