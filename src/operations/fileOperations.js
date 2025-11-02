import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

export async function readFile(currentDir, filePath) {
  try {
    const absolutePath = path.resolve(currentDir, filePath);
    const stats = await fsPromises.stat(absolutePath);

    if (!stats.isFile()) {
      throw new Error('Not a file');
    }

    const readStream = fs.createReadStream(absolutePath, 'utf8');
    readStream.pipe(process.stdout);

    await new Promise((resolve, reject) => {
      readStream.on('end', resolve);
      readStream.on('error', reject);
    });

    console.log();
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function createFile(currentDir, fileName) {
  try {
    const filePath = path.join(currentDir, fileName);
    await fsPromises.writeFile(filePath, '');
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function createDir(currentDir, dirName) {
  try {
    const dirPath = path.join(currentDir, dirName);
    await fsPromises.mkdir(dirPath);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function renameFile(currentDir, oldPath, newName) {
  try {
    const absoluteOldPath = path.resolve(currentDir, oldPath);
    const absoluteNewPath = path.join(path.dirname(absoluteOldPath), newName);

    await fsPromises.access(absoluteOldPath);
    await fsPromises.rename(absoluteOldPath, absoluteNewPath);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function copyFile(currentDir, sourceFile, destPath) {
  try {
    const absoluteSourcePath = path.resolve(currentDir, sourceFile);
    let absoluteDestPath = path.resolve(currentDir, destPath);

    try {
      const destStats = await fsPromises.stat(absoluteDestPath);
      if (destStats.isDirectory()) {
        absoluteDestPath = path.join(
          absoluteDestPath,
          path.basename(absoluteSourcePath)
        );
      }
    } catch (error) {
      throw new Error('Operation failed');
    }

    const readStream = fs.createReadStream(absoluteSourcePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);

    await pipeline(readStream, writeStream);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function moveFile(currentDir, sourcePath, destPath) {
  try {
    await copyFile(currentDir, sourcePath, destPath);
    await removeFile(currentDir, sourcePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function removeFile(currentDir, filePath) {
  try {
    const absolutePath = path.resolve(currentDir, filePath);
    await fsPromises.rm(absolutePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
}
