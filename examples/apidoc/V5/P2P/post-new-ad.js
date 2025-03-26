const { RestClientV5 } = require('bybit-api');

// Create a client
const client = new RestClientV5({
  testnet: true,
  key: 'XXXXX',
  secret: 'XXXXX',
});

// Create new P2P advertisement
client
  .createP2PAd({
    tokenId: 'USDT',
    currencyId: 'EUR',
    side: '0',
    priceType: '0',
    premium: '',
    price: '0.92',
    minAmount: '20',
    maxAmount: '45000',
    paymentIds: ['7110'],
    remark: 'test',
    tradingPreferenceSet: {
      isKyc: 1,
      hasCompleteRateDay30: 1,
      completeRateDay30: '95',
      hasOrderFinishNumberDay30: 1,
      hasRegisterTime: 0,
      hasUnPostAd: 0,
      isEmail: 0,
      isMobile: 0,
      nationalLimit: '',
      orderFinishNumberDay30: 60,
      registerTimeThreshold: 0,
      verificationOrderLabels: [],
      verificationOrderSwitch: false,
    },
    quantity: '20000',
    paymentPeriod: '15',
    itemType: 'ORIGIN',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
