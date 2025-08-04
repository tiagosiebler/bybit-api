import { RestClientV5 } from '../../src';

const client = new RestClientV5({
  testnet: true,
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET',
});

async function getCryptoLoanPosition() {
  try {
    const response = await client.getCryptoLoanPositionNew();

    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

getCryptoLoanPosition();
