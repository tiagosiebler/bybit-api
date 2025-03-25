const { RestClientV5 } = require('bybit-api');

// Initialize the client with testnet mode
const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

// Example parameters
const params = {
  orderId: '1898976123321221120', // Replace with your order ID
  size: '1', // Number of messages per page
  currentPage: '1', // Optional: current page number
};

// Call the function
client
  .getP2POrderMessages(params)
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 