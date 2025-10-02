const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
});

// Get fee group structure for all groups
client
  .getFeeGroupStructure({
    productType: 'contract',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// Get fee group structure for a specific group
client
  .getFeeGroupStructure({
    productType: 'contract',
    groupId: '1',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
