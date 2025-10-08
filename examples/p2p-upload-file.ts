import fs from 'fs';

import { RestClientV5 } from '../src';

// ENDPOINT: /v5/p2p/oss/upload_file
// METHOD: POST
// PUBLIC: NO
// NOTE: Node.js only (no browser support)

const client = new RestClientV5({
  key: 'r0WhN6l7TZmTfvhwbf',
  secret: 'fomvKX11gxTwjOdJOb66wzgAgkClE132agXC',
  testnet: true,
});

async function uploadP2PChatFile() {
  try {
    const result0 = await client.getP2POrders({
      page: 1,
      size: 1,
    });
    console.log('Get P2P orders result:', result0);

    // Example 1: Upload from file path (simplest method)
    // Filename is auto-detected from the path
    const result1 = await client.uploadP2PChatFile({
      upload_file: '../docs/images/logo1.png',
    });
    console.log('Upload from file path result:', result1);

    // Example 2: Upload from file path with custom filename
    const result2 = await client.uploadP2PChatFile({
      upload_file: '../docs/images/logo1.png',
      filename: 'custom-name.png', // Override the filename
    });
    console.log('Upload with custom filename result:', result2);

    // Example 3: Upload from Buffer
    // Filename is required when using Buffer
    const fileBuffer = fs.readFileSync('../docs/images/logo1.png');
    const result3 = await client.uploadP2PChatFile({
      upload_file: fileBuffer,
      filename: 'logo1.png', // Required for Buffer
    });
    console.log('Upload from Buffer result:', result3);

    // Supported file types:
    // - Images: jpg, jpeg, png
    // - Documents: pdf
    // - Videos: mp4
  } catch (e) {
    console.error('Error uploading file:', e);
  }
}

uploadP2PChatFile();
