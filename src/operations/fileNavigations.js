import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export async function goUp(currentDir) {
  const parent = path.dirname(currentDir);

  if (
    parent === currentDir ||
    (os.platform() === 'win32' && path.parse(currentDir).root === currentDir)
  ) {
    return currentDir;
  }

  return parent;
}

export async function changeDir(currentDir, targetPath) {
  try {
    let newPath;

    if (path.isAbsolute(targetPath)) {
      newPath = targetPath;
    } else {
      newPath = path.resolve(currentDir, targetPath);
    }

    const stats = await fs.stat(newPath);
    if (!stats.isDirectory()) {
      throw new Error('Not a directory');
    }

    return newPath;
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function listDir(currentDir) {
  try {
    const items = await fs.readdir(currentDir);
    const itemsWithStats = await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(currentDir, item);
        const stats = await fs.stat(itemPath);
        return {
          name: item,
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile(),
        };
      })
    );

    itemsWithStats.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });

    console.table(
      itemsWithStats.map((item) => ({
        Name: item.name,
        Type: item.isDirectory ? 'directory' : 'file',
      }))
    );
  } catch (error) {
    throw new Error('Operation failed');
  }
}
