export interface FileUploadRequestParams {
  fileBuffer: Buffer;
  fileName: string;
}
/**
 * Assume MIME type from filename extension
 */
export function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    mp4: 'video/mp4',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

/**
 * @private Build multipart/form-data payload for file uploads (Node.js only)
 */
export async function buildMultipartPayload(
  params: FileUploadRequestParams,
): Promise<{
  payload: Buffer;
  contentType: string;
}> {
  const fileBuffer = params.fileBuffer;
  const fileName = params.fileName;

  if (!fileBuffer) {
    throw new Error('upload_file parameter is required for file uploads');
  }

  if (!fileName) {
    throw new Error(
      'filename parameter is required for file uploads (used for MIME type detection)',
    );
  }

  if (!Buffer.isBuffer(fileBuffer)) {
    throw new Error(
      'uploadFile must be provided as a Buffer. To upload from a file path, read the file yourself: fs.readFileSync(filePath)',
    );
  }

  const fileData = { data: fileBuffer, filename: fileName };

  // Determine MIME type from filename extension
  const mimeType = getMimeType(fileData.filename);

  // Build multipart/form-data manually (following Bybit's format)
  const boundary = 'boundary-for-file';
  const contentType = `multipart/form-data; boundary=${boundary}`;

  const header = `--${boundary}\r\nContent-Disposition: form-data; name="upload_file"; filename="${fileData.filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;

  // Construct payload (Node.js only - simple Buffer concatenation)
  const payload = Buffer.concat([
    Buffer.from(header, 'utf-8'),
    fileData.data,
    Buffer.from(footer, 'utf-8'),
  ]);

  return { payload, contentType };
}
