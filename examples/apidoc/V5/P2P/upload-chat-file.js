const { RestClientV5 } = require('bybit-api');
const fs = require('fs');

// Initialize the client with testnet mode
const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

// Create form data
const formData = new FormData();
formData.append('upload_file', fs.createReadStream('path/to/your/file.jpg')); // Replace with your file path

// Call the function
client
  .uploadP2PChatFile(formData)
  .then((response) => {
    console.log('Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 