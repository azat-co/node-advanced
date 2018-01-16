require('./module-4.js')
// console.log(require.cache)
delete require.cache[require.resolve('./module-4.js')]
// console.log(require.cache)
require('./module-4.js')