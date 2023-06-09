const { RestClientV5 } = require('bybit-api');

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client
  .setTradingStop({
    category: 'linear',
    symbol: 'XRPUSDT',
    takeProfit: '0.5',
    stopLoss: '0.2',
    tpTriggerBy: 'MarkPrice',
    slTriggerBy: 'IndexPrice',
    tpslMode: 'Partial',
    tpOrderType: 'Limit',
    slOrderType: 'Limit',
    tpSize: '50',
    slSize: '50',
    tpLimitPrice: '0.49',
    slLimitPrice: '0.21',
    positionIdx: 0,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
