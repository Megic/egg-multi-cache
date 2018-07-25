'use strict';

module.exports = app => {
  if (app.config.multiCache.agent) require('./lib/cache-loader')(app);
};
