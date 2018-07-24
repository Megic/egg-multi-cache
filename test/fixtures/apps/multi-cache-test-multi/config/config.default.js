'use strict';
const redisStore = require('cache-manager-ioredis');

/**
 * egg-multi-cache default config
 * @member Config#multiCache
 * @property {String} SOME_KEY - some description
 */
module.exports = {
  cache: {
    clients: {
      memory: {
        store: 'memory',
        max: 100,
        ttl: 0,
      },
      redis: { // full config: https://github.com/dabroek/node-cache-manager-ioredis#single-store
        driver: redisStore,
        host: 'dev.lbsmed.com',
        port: 9201,
        password: '',
        db: 0,
        ttl: 600,
      },
    },
    multiCaching: {
      memredis: [ 'memory', 'redis' ],
    },
    default: {
    },
  },
  multiCache: {
    app: true,
    agent: false,
  },
};
