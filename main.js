'use strict';

function iterate(obj, fn) {
  for (const prop in obj) {
    if ({}.hasOwnProperty.call(obj, prop)) {
      obj[prop] = fn(obj[prop]);
    }
  }

  return obj;
}

function wrap(fn, deps) {
	fn = fn.__orig || fn;

  deps = Object.assign(...deps);

	const out = (...args) => fn(deps, ...args);
	out.__orig = fn;

	return out;
}

function injectedFunctions(mod, deps) {
  return iterate(mod, fn => {
    if (typeof fn === 'function') {
      return wrap(fn, deps);
    }

    return fn;
  });
}

function injectDeps(modules, deps) {
  return iterate(modules, mod => {
    return Object.assign(
      rid => injectedFunctions(mod, [{rid}, deps]),
      injectedFunctions(mod, [deps])
    );
  });
}

function requireAll() {
  const {join} = require('path');

  const thingiesPath = join(__dirname, 'thingies');

  const thingies = {};

  require('fs').readdirSync(thingiesPath)
    .forEach(fileName => {
      const name = fileName.replace('.js', '');
      thingies[name] = require(join(thingiesPath, fileName));
    });

  return thingies;
}

exports = module.exports = opts => {
  if (!opts.token) {
    throw new Error('`token` is totally, absolutely, unavoidably and undeniably needed. So consider passing it in constructor next time… Maybe?');
  }

  const {request, many} = require('./common.js');

  return injectDeps(requireAll(), {
    many,
    toggl: request(opts)
  });
};
