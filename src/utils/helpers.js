export function showCurrentDir(dir) {
  console.log(`You are currently in ${dir}`);
}

export function getUsername() {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  console.log(usernameArg);
  return usernameArg ? usernameArg.split('=')[1] : 'User';
}
