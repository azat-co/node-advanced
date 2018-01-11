const util = require('util')
console.log('Hello %s from %s', 'Azat', {city: 'San Francisco'}) // Hello Azat from [object Object]
console.log('t', {city: 'San Francisco'}) // { city: 'San Francisco' }
console.log(util.inspect({city: 'San Francisco'})) // '{ city: \'San Francisco\' }'
const str = util.inspect({city: 'San Francisco'})
console.log(str)