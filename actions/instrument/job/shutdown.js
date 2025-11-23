const process = require('process')
const { spawn } = require('child_process');

function run(executable, args = []) {
  if (process.platform != 'linux') return Promise.resolve();
  return new Promise((resolve, reject) => {
    const childProcess = spawn(
      executable,
      args,
      { cwd: __dirname, stdio: 'inherit' }
    );
    childProcess.on(
      'close',
      code => code == 0 ? resolve(code) : reject(code)
    );
    childProcess.on('error', error => reject(new Error(error)));
  });
}

run('/bin/sh', [ '-e', __dirname + '/shutdown.sh' ])
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Shutdown failed:', err);
    process.exit(1);
  });
