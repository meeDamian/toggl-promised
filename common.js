'use strict';

const API_URL = `https://www.toggl.com/api`;
const API_V8 = 'v8';
const API_V9 = 'v9';

let me = {
  API_URL,
  API_V8,
  API_V9
};

me.buildUrl = function (_, version, endpoint, id) {
  if (!endpoint) {
    throw new Error('endpoint must be provided');
  }

  if (typeof endpoint === 'string') {
    endpoint = [endpoint];
  }

  if (id) {
    endpoint = endpoint.map(s => s === ':id' ? id : s);
  }

  return [
    API_URL,
    version || API_V8,
    ...endpoint
  ].join('/');
};

me.request = function ({request}, {token, timeout}) {
  return ({method = 'GET', endpoint, version}, params) => {
    return new Promise((resolve, reject) => {
      const tm = setTimeout(reject, timeout || 2000);

      const {id, body, qs} = params || {};

      const url = me.buildUrl(version, endpoint, id);

      request({
        method, url, qs, body,
        json: true,
        headers: {
          Authorization: `Basic ${new Buffer(`${token}:api_token`, 'utf8').toString('base64')}`
        }
      }, (error, {statusCode}, body) => {
        clearTimeout(tm);

        if (error) {
          reject({statusCode, error});
          return;
        }

        if (statusCode === 403) {
          reject({statusCode, error: new Error('Unauthorised request. Sure that token is correct?')});
          return;
        }

        if (statusCode === 429) {
          reject({statusCode, error: new Error('Too many requests. Slow down!')});
          return;
        }

        if (statusCode !== 200) {
          reject({statusCode, error: new Error(`Some other error ${url}`)});
          return;
        }

        resolve({body});
      });
    })
    .then(({body}) => {
      if (body.data !== undefined) {
        return body.data;
      }

      return body;
    })
    .catch(err => {
      console.log(err);
    });
  };
};

me.many = function (_, fn, ids) {
	return Promise.all(ids
		.filter((id, pos, arr) => id && arr.indexOf(id) === pos)  // remove dups
		.map(fn)
	);
};

me = require('mee')(module, me, {
  request: require('request')
});
