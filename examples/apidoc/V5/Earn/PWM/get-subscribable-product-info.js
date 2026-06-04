import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5();

client
  .getPwmSubscribableProductInfo()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
