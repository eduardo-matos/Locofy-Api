const { db } = require('../src/models');

before(() => db.sync());
beforeEach(() => db.truncate());
