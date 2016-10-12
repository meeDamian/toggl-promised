'use strict';

const PROJECT = {
  details: {
    endpoint: ['projects', ':id']
  },
  list: {
    endpoint: ['me', 'projects'],
    version: 'v9'
  }
};
Object.freeze(PROJECT);

const me = {
  PROJECT
};

me.details = function({toggl, rid}, id = rid, deps = false) {
  return toggl(PROJECT.details, {id});
};

me.list = function({toggl, many, rid}, ids = rid) {
  if (!ids) {
    return toggl(PROJECT.list);
  }

  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  return many(me.details, ids);
};

module.exports = me;
