'use strict';

const Store = require('./store');
const manager = require('cache-manager');

module.exports = app => {
  const config = app.config.cache;
  if (!config.client && !config.clients) config.client = { };
  app.addSingleton('cache', createCache);
  app.ready(() => {
    if (config.clients && config.multiCaching) {
      const multiCaching = {};
      Object.keys(config.multiCaching).forEach(key => {
        const cachings = config.multiCaching[key];
        if (!cachings instanceof Array || cachings.length < 1) return;
        const caches = cachings.map(caching => {
          const cache = app.cache.get(caching);
          if (!cache) throw new Error('cache instance no found in multiCaching');
          return cache.cacher;
        });
        const cacher = manager.multiCaching(caches);
        const store = new Store(cacher);
        store.cacher = cacher;
        multiCaching[key] = store;
      });
      app.cache.get = new Proxy(app.cache.get, {
        apply(target, ctx, args) {
          if (multiCaching[args[0]]) return multiCaching[args[0]];
          return Reflect.apply(...arguments);
        },
      });
    }
  });
};

async function createCache(config) {
  config = Object.assign({ valid: _ => _ !== undefined }, config);
  const cacher = manager.caching(config);
  const store = new Store(cacher, config);
  store.cacher = cacher;
  return store;
}
