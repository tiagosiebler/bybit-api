import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.placeRWAOrder({ productId: 1001, orderType: 'Stake', coin: 'USDC', stakeAmount: '100', accountType: 'FUND', orderLinkId: 'my-stake-001' })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
