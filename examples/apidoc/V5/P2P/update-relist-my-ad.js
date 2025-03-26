const { RestClientV5 } = require('bybit-api');

// Create a client
const client = new RestClientV5({
  testnet: true,
  key: 'XXXXX',
  secret: 'XXXXX',
});

// Update P2P advertisement
client
  .updateP2PAd({
    id: '1898988222063644672',
    priceType: '0',
    premium: '',
    price: '0.914',
    minAmount: '25',
    maxAmount: '5000',
    remark: '',
    paymentIds: ['-1'],
    tradingPreferenceSet: {},
    actionType: 'ACTIVE',
    quantity: '1000',
    paymentPeriod: '15',
    itemType: 'ORIGIN',
    subsidyAd: false,
    securityRiskToken: '',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  }); 