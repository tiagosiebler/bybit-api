import fs from 'fs';
import path from 'path';

import { RestClientV5 } from '../src';

// ENDPOINT: /v5/p2p/oss/upload_file
// METHOD: POST
// PUBLIC: NO
// NOTE: Node.js only (Buffer required)

const key = process.env.API_KEY_COM;
const secret = process.env.API_SECRET_COM;

const client = new RestClientV5({
  key: key,
  secret: secret,
});

async function uploadP2PChatFile() {
  try {
    // Test basic P2P API connectivity
    const result0 = await client.getP2POrders({
      page: 1,
      size: 1,
    });
    console.log('Get P2P orders result:', result0);

    // You must read the file yourself and pass the Buffer + filename
    const filePath = './docs/images/logo1.png';
    const fileBuffer = fs.readFileSync(filePath);

    // Example 1: Upload from file path
    const result1 = await client.uploadP2PChatFile({
      upload_file: fileBuffer,
      filename: path.basename(filePath), // Extract filename from path
    });
    console.log('Upload from file path result:', result1);

    // Example 2: Upload with custom filename
    // You control the filename sent to Bybit
    const result2 = await client.uploadP2PChatFile({
      upload_file: fileBuffer,
      filename: 'custom-name.png', // Use any filename you want
    });
    console.log('Upload with custom filename result:', result2);

    // Example 3: Upload different file
    const pdfBuffer = fs.readFileSync('./document.pdf');
    const result3 = await client.uploadP2PChatFile({
      upload_file: pdfBuffer,
      filename: 'document.pdf',
    });
    console.log('Upload PDF result:', result3);

    // Supported file types (determined by filename extension):
    // - Images: jpg, jpeg, png
    // - Documents: pdf
    // - Videos: mp4
  } catch (e) {
    console.error('Error uploading file:', e);
  }
}

uploadP2PChatFile();
