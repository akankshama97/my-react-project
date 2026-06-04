const { execSync } = require('child_process');
const out = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    return `ERR: ${e.message}`;
  }
};
console.log('COMSPEC=' + process.env.COMSPEC);
console.log('PATH=' + process.env.PATH.split(';').slice(0,20).join('|'));
console.log('script-shell=' + out('npm config get script-shell'));
console.log('prefix=' + out('npm config get prefix'));
console.log('nodeexec=' + out('node -p "process.execPath"'));
console.log('npm=' + out('npm -v'));
console.log('npx=' + out('npx -v'));
console.log('vite=' + out('npx vite --version'));
