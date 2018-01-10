// Source: https://stackoverflow.com/questions/9565912/convert-the-output-of-os-cpus-in-node-js-to-percentage

const os = require('os')
let cpus = os.cpus()

cpus.forEach((cpu, i) => {
  console.log('CPU %s:', i)
  let total = 0

  for (let type in cpu.times) {
    total += cpu.times[type]
  }

  for (let type in cpu.times) {
    console.log(`\t ${type} ${Math.round(100 * cpu.times[type] / total)}%`)
  }
})
