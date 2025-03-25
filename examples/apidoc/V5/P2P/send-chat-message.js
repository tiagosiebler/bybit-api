const { RestClientV5 } = require('bybit-api');

// Initialize the client with testnet mode
const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

// Example parameters
const params = {
  message: 'hi, test',
  contentType: 'text',
  orderId: '1898976123321221120', // Replace with your order ID
  // Optional parameters:
  // msgUuid: 'your-message-uuid',
  // fileName: 'example.pdf'
};

// Call the function
client
  .sendP2POrderMessage(params)
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 