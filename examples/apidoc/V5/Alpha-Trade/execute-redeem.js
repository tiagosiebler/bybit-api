import { RestClientV5 } from 'bybit-api';
// or, if require is preferred:
// const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .executeAlphaTradeRedeem({
    fromTokenCode: 'DEX_123',
    fromTokenAmount: '12500000',
    toTokenCode: 'CEX_1',
    slippage: '0.005',
    quoteData: 'eyJhbGciOiJIUzI1NiJ9...',
    gas: '0.0003',
    quoteMode: 0,
    correctingCode: 'a1b2c3d4e5f6',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
