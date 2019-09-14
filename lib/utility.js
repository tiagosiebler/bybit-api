const {createHmac} = require('crypto');

module.exports = {
  signMessage(message, secret) {
    return createHmac('sha256', secret)
      .update(message)
      .digest('hex');
  }
}
