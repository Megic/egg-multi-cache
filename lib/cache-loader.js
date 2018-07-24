'use strict';

const Store = require('./store');
const manager = require('cache-manager');

module.exports = app => {
  const config = app.config.cache;
  if (!config.client && !config.clients) config.client = { };
  app.addSingleton('cache', createCache);
};

async function createCache(config) {
  config = Object.assign({ valid: _ => _ !== undefined }, config);
  const cache = manager.caching(config);
  const store = new Store(cache, config);
  return store;
}
