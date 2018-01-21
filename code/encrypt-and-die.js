const {spawn} = require('child_process')
const str = 'React Quickly: Painless web apps with React, JSX, Redux, and GraphQL'.repeat(100)
console.time('launch encryption')

const rubyEncrypt = spawn('ruby', ['encrypt.rb'], {
  env: {STR: str},
  detached: true,
  stdio: 'ignore'
})
rubyEncrypt.unref()

console.timeEnd('launch encryption')
