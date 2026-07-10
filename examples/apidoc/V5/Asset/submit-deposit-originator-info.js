import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
  testnet: true,
  key: 'apikey',
  secret: 'apisecret',
});

client.submitDepositOriginatorInfo({
    depositId: 1234567890,
    subAccountId: 0,
    questionnaire: JSON.stringify({
      walletType: 0,
      vaspCode: 'BINANCEUS_VASP',
      legalType: 'individual',
      firstName: 'John',
      lastName: 'Smith',
      transactionPurpose: 'Personal investment in long-term holdings',
    }),
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
