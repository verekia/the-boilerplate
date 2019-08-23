const { spawn, spawnSync } = require('child_process')

const spawnConfig = { shell: true, stdio: 'inherit' }

const run = (cmd, options) => {
  if (!(options && options.silent)) {
    console.log(`Running (async): ${cmd}`)
  }
  spawn(cmd, spawnConfig)
}

const runSync = (cmd, options) => {
  if (!(options && options.silent)) {
    console.log(`Running: ${cmd}`)
  }
  const result = spawnSync(cmd, spawnConfig)
  if (result.status !== 0) {
    process.exit(1)
  }
}

module.exports = { run, runSync }
