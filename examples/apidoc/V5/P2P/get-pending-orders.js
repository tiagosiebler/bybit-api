const { RestClientV5 } = require('bybit-api');

// Initialize the client with testnet mode
const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

// Example parameters
const params = {
  status: 10, // waiting for buy pay
  beginTime: '1741831397000', // Optional: filter by start time
  endTime: '1741831424861', // Optional: filter by end time
  tokenId: 'USDT', // Optional: filter by token
  side: [0, 1], // Optional: filter by side (0: Buy, 1: Sell)
  page: 1,
  size: 3,
};

// Call the function
client
  .getP2PPendingOrders(params)
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 