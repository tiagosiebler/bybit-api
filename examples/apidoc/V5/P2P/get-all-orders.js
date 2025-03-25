const { RestClientV5 } = require('bybit-api');

// Initialize the client with testnet mode
const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

// Example parameters
const params = {
  status: null, // Optional: filter by order status
  beginTime: null, // Optional: filter by start time
  endTime: null, // Optional: filter by end time
  tokenId: null, // Optional: filter by token ID
  side: null, // Optional: filter by side (0: Buy, 1: Sell)
  page: 1, // Required: page number
  size: 1, // Required: rows per page
};

// Call the function
client
  .getP2POrders(params)
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
