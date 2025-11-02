import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

export async function calculateHash(currentDir, filePath) {
  try {
    const absolutePath = path.resolve(currentDir, filePath);

    const hash = createHash('sha256');
    const readStream = fs.createReadStream(absolutePath);

    await new Promise((resolve, reject) => {
      readStream.on('data', (chunk) => hash.update(chunk));
      readStream.on('end', resolve);
      readStream.on('error', reject);
    });

    console.log(hash.digest('hex'));
  } catch (error) {
    throw new Error('Operation failed');
  }
}
