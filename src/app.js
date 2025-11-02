import readline from 'node:readline';
import os from 'os';

import * as utils from './utils';
import * as operations from './operations';

async function startFileManager() {
  const username = operations.getUsername();
  let currentDir = os.homedir();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Welcome to the File Manager, ${username}!`);
  utils.showCurrentDir(currentDir);

  function prompt() {
    rl.question('> ', async (input) => {
      if (result?.newDir) {
        currentDir = result.newDir;
      }
      utils.showCurrentDir(currentDir);

      if (!result?.shouldExit) {
        prompt();
      }
    });
  }

  prompt();
}

startFileManager();
