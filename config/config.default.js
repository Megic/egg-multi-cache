'use strict';

/**
 * egg-multi-cache default config
 * @member Config#multiCache
 * @property {String} SOME_KEY - some description
 */
module.exports = {
  cache: {
    default: {
    },
  },
  multiCache: {
    app: true,
    agent: false,
  },
};
