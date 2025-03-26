const { RestClientV5 } = require('bybit-api');

// Initialize the client with testnet mode
const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

// Example parameters
const params = {
  originalUid: '290118', // Replace with the counterparty user ID
  orderId: '1900004704665923584', // Replace with your order ID
};

// Call the function
client
  .getP2PCounterpartyUserInfo(params)
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 