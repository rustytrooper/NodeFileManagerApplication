export function showCurrentDir(dir) {
  console.log(`You are currently in ${dir}`);
}

export function getUsername() {
  const usernameArg = process.argv.find((arg) => arg.startsWith('--username='));
  return usernameArg ? usernameArg.split('=')[1] : 'User';
}
