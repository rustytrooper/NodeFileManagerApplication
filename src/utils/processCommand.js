import * as operations from '../operations/index.js';

export async function processCommand(input, currentDir, username) {
  if (!input) return {};

  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case '.exit':
        console.log(
          `\nThank you for using File Manager, ${username}, goodbye!`
        );
        rl.close();
        return { shouldExit: true };

      case 'up':
        return { newDir: await operations.goUp(currentDir) };

      case 'cd':
        if (args.length !== 1) throw new Error('Invalid input');
        return { newDir: await operations.changeDir(currentDir, args[0]) };

      case 'ls':
        await operations.listDir(currentDir);
        return {};

      case 'cat':
        if (args.length !== 1) throw new Error('Invalid input');
        await operations.readFile(currentDir, args[0]);
        return {};

      case 'add':
        if (args.length !== 1) throw new Error('Invalid input');
        await operations.createFile(currentDir, args[0]);
        return {};

      case 'rn':
        if (args.length !== 2) throw new Error('Invalid input');
        await operations.renameFile(currentDir, args[0], args[1]);
        return {};

      case 'cp':
        if (args.length !== 2) throw new Error('Invalid input');
        await operations.copyFile(currentDir, args[0], args[1]);
        return {};

      case 'mv':
        if (args.length !== 2) throw new Error('Invalid input');
        await operations.moveFile(currentDir, args[0], args[1]);
        return {};

      case 'rm':
        if (args.length !== 1) throw new Error('Invalid input');
        await operations.removeFile(currentDir, args[0]);
        return {};

      case 'mkdir':
        if (args.length !== 1) throw new Error('Invalid input');
        await operations.createDir(currentDir, args[0]);
        return {};

      case 'os':
        if (args.length !== 1) throw new Error('Invalid input');
        await operations.getOSInfo(args[0]);
        return {};

      case 'hash':
        if (args.length !== 1) throw new Error('Invalid input');
        await operations.calculateHash(currentDir, args[0]);
        return {};

      case 'compress':
        if (args.length !== 2) throw new Error('Invalid input');
        await operations.compressFile(currentDir, args[0], args[1]);
        return {};

      case 'decompress':
        if (args.length !== 2) throw new Error('Invalid input');
        await operations.decompressFile(currentDir, args[0], args[1]);
        return {};

      default:
        console.log('Invalid input');
        return {};
    }
  } catch (error) {
    console.log(
      error.message === 'Invalid input' ? 'Invalid input' : 'Operation failed'
    );
    return {};
  }
}
