import test from 'ava';

test('[timeEntry.js].list() is exported properly', t => {
  const fn = require('../timeEntry.js').list;

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
});
