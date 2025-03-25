const { RestClientV5 } = require('bybit-api');

// Initialize the client with testnet mode
const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET'
});

// Example parameters for getting personal P2P ads
const params = {
  itemId: '123456789', // Optional: Specific advertisement ID
  status: 1, // Optional: Advertisement status (1: active, 2: completed, 3: cancelled)
  side: 1, // Optional: 0: buy; 1: sell
  tokenId: 'USDT', // Optional: Token ID
  page: 1, // Optional: Page number
  size: 20, // Optional: Page size
  currencyId: 'USD' // Optional: Currency ID
};

// Get personal P2P ads
client.getP2PPersonalAds(params)
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  }); 