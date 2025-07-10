const { spawn } = require('child_process');

function run(cmd, args, name, color) {
  const proc = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], shell: true });
  proc.stdout.on('data', data => {
    process.stdout.write(`[${name}] ${data}`);
  });
  proc.stderr.on('data', data => {
    process.stderr.write(`[${name}][err] ${data}`);
  });
  proc.on('close', code => {
    process.stdout.write(`[${name}] exited with code ${code}\n`);
  });
}

run('npm', ['run', 'dev:frontend'], 'frontend');
run('npm', ['run', 'dev:backend'], 'backend'); 