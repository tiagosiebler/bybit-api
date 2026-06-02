import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .pwmFundTransfer({
    transferId: '4fdf-re-4343-frewr',
    fromUserId: 800001,
    toUserId: 800002,
    amount: '1.00',
    coin: 'BTC',
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
