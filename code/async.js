const util = require('util')
const f = async function() {
  try {
    await util.promisify(setTimeout)(()=>{consoleg.log('here')}, 1000)
  } catch(e) {
    await Promise.reject(new Error('test'));
  }
}

f()