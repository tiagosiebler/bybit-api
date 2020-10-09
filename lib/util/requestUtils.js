const { createHmac } = require('crypto');

module.exports = {
  signMessage(message, secret) {
    return createHmac('sha256', secret)
      .update(message)
      .digest('hex');
  },
  serializeParams(params = {}, strict_validation = false) {
    return Object.keys(params)
      .sort()
      .map(key => {
        const value = params[key];
        if (strict_validation === true && typeof value === 'undefined') {
          throw new Error('Failed to sign API request due to undefined parameter');
        }
        return `${key}=${value}`;
      })
      .join('&');
  }
};
