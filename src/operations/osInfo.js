import os from 'node:os';

export async function getOSInfo(flag) {
  try {
    switch (flag) {
      case '--EOL':
        console.log(JSON.stringify(os.EOL));
        break;

      case '--cpus':
        const cpus = os.cpus();
        console.log(`Overall amount: ${cpus.length}`);
        console.table(
          cpus.map((cpu) => ({
            Model: cpu.model,
            'Clock rate (GHz)': (cpu.speed / 1000).toFixed(2),
          }))
        );
        break;

      case '--homedir':
        console.log(os.homedir());
        break;

      case '--username':
        console.log(os.userInfo().username);
        break;

      case '--architecture':
        console.log(os.arch());
        break;

      default:
        throw new Error('Invalid flag');
    }
  } catch (error) {
    throw new Error('Operation failed');
  }
}
