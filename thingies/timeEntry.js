'use strict';

const TIME_ENTRY = {
	create: {
		endpoint: ['time_entries', 'create'],
		method: 'POST'
	},
	current: {
		endpoint: ['time_entries', 'current']
	},
	delete: {
		endpoint: ['time_entries', ':id'],
		method: 'DELETE'
	},
	details: {
		endpoint: ['time_entries', ':id']
	},
	list: {
		endpoint: 'time_entries'
	},
	start: {
		endpoint: ['time_entries', 'start'],
		method: 'POST'
	},
	stop: {
		endpoint: ['time_entries', ':id', 'stop'],
		method: 'PUT'
	},
	update: {
		endpoint: ['time_entries', ':id'],
		method: 'PUT'
	}
};
Object.freeze(TIME_ENTRY);

let me = {
  TIME_ENTRY
};

me.list = function({toggl}) {
  return toggl(TIME_ENTRY.list);
};

module.exports = me;
