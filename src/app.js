import readline from 'node:readline';
import os from 'node:os';
import * as utils from '../src/utils/index.js';

async function startFileManager() {
  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
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
