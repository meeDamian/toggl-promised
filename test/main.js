import test from 'ava';

test('[main.js] exports constructor properly', t => {
  const fn = require('../main.js');

  if (!fn || typeof fn !== 'function') {
    t.fail();
  }
});

test('[main.js] exports constructor properly', t => {
  require('../main.js')();
});
