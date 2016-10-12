'use strict';

const CLIENT = {
  create: {
    endpoint: 'clients',
    method: 'POST'
  },
  details: {
    endpoint: ['clients', ':id']
  },
  update: {
    endpoint: ['clients', ':id'],
    method: 'PUT'
  },
  delete: {
    endpoint: ['clients', ':id'],
    method: 'DELETE'
  },
  list: {
    endpoint: 'clients',
  },

  // TODO: move that somewhere else?
  list2: {
    endpoint: ['workspaces', ':id', 'clients']
  }
};
Object.freeze(CLIENT);

const me = {
  CLIENT
};

// TODO: list params avail in clients
//      name, wids, notes

me.create = ({toggl}, client) => toggl(CLIENT.create, {body: {client}});

me.update = ({toggl, rid}, id = rid, client) => toggl(CLIENT.update, {id, body: {client}});

me.delete = ({toggl, rid}, id = rid) => toggl(CLIENT.delete, {id});

me.details = ({toggl, rid}, id = rid) => toggl(CLIENT.details, {id});

me.list = ({toggl, rid = undefined}, id = rid) => {
  if (!id) {
    return toggl(CLIENT.list);
  }

  return toggl(CLIENT.list2, {id});
};

module.exports = me;
