import readline from 'node:readline';
import os from 'node:os';

import * as utils from '../src/utils/index.js';
import * as operations from '../src/operations/index.js';

async function startFileManager() {
  const username = utils.getUsername();
  let currentDir = os.homedir();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Welcome to the File Manager, ${username}!`);
  utils.showCurrentDir(currentDir);

  function prompt() {
    rl.question('> ', async (input) => {
      const result = await utils.processCommand(input, currentDir, username);
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
