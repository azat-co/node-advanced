const fs = require('fs')
const util = require('util')
const f = async function () {
  try {
    const data = await util.promisify(fs.readFile)('os.js', 'utf8') // <- try changing to non existent file to trigger an error
    console.log(data)
  } catch (e) {
    console.log('ooops')
    console.error(e)
    process.exit(1)
  }
}

f()
console.log('could be doing something else')
