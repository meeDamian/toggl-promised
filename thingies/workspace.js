'use strict';

const WORKSPACE = {
  details: {
    endpoint: ['workspaces', ':id']
  },
  list: {
    endpoint: 'workspaces'
  }
};
Object.freeze(WORKSPACE);

const me = {
  WORKSPACE
};

me.details = function ({toggl}, id) {
  return toggl(WORKSPACE.details, {id});
};

me.list = function ({toggl}) {
  return toggl(WORKSPACE.list);
};

module.exports = me;
