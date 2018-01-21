// debug-me.js
global.limit = 5
setTimeout(() => {
  debugger
  console.log('inside of timeout')
}, 1000)
console.log('after settimeout but not before the timeout')
