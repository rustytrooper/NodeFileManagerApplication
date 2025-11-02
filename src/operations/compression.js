import fs from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

export async function compressFile(currentDir, sourcePath, destPath) {
  try {
    const absoluteSourcePath = path.resolve(currentDir, sourcePath);
    const absoluteDestPath = path.resolve(currentDir, destPath);

    const readStream = fs.createReadStream(absoluteSourcePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const compressStream = createBrotliCompress();

    await pipeline(readStream, compressStream, writeStream);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function decompressFile(currentDir, sourcePath, destPath) {
  try {
    const absoluteSourcePath = path.resolve(currentDir, sourcePath);
    const absoluteDestPath = path.resolve(currentDir, destPath);

    const readStream = fs.createReadStream(absoluteSourcePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const decompressStream = createBrotliDecompress();

    await pipeline(readStream, decompressStream, writeStream);
  } catch (error) {
    throw new Error('Operation failed');
  }
}
