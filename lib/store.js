'use strict';

class Store {

  constructor(driver, options) {
    this.driver = driver;
    this.options = options;
  }

  async set(name, value, options = null) {
    if (typeof value === 'function') {
      value = await value();
    }

    return new Promise((resolve, reject) => {
      this.driver.set(name, value, options, err => {
        if (err) { return reject(err); }
        resolve(value);
      });
    });
  }

  async wrap(name, defaultValue = null, options = {}) {
    let defaultFunc = () => null;
    if (typeof defaultValue === 'function') {
      defaultFunc = defaultValue;
    } else {
      defaultFunc = () => defaultValue;
    }
    return new Promise((resolve, reject) => {
      return this.driver.wrap(name, function(cb) {
        Promise.resolve()
          .then(defaultFunc)
          .then(function(result) {
            cb(null, result);
            return null;
          })
          .catch(cb);
      }, options, function(err, result) {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  get(name) {
    return new Promise((resolve, reject) => {
      this.driver.get(name, (err, result) => {
        if (err) { return reject(err); }
        resolve(result);
      });
    });
  }

  del(name) {
    return new Promise((resolve, reject) => {
      this.driver.del(name, err => {
        if (err) { return reject(err); }
        resolve();
      });
    });
  }

  reset() {
    return new Promise((resolve, reject) => {
      this.driver.reset(err => {
        if (err) { return reject(err); }
        resolve();
      });
    });
  }
}

module.exports = Store;
