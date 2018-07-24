'use strict';

/**
 * egg-multi-cache default config
 * @member Config#multiCache
 * @property {String} SOME_KEY - some description
 */
module.exports = {
  cache: {
    client: {
      store: 'memory',
      max: 100,
      ttl: 0,
    },
    // clients: {
    //   memory: {
    //     store: 'memory',
    //     max: 100,
    //     ttl: 0,
    //   },
    // },
    default: {
    },
  },
  multiCache: {
    app: true,
    agent: false,
  },
};
