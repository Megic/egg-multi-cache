'use strict';

module.exports = app => {
  if (app.config.multiCache.app) require('./lib/cache-loader')(app);
};
