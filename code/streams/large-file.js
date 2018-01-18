const fs = require('fs')
const path = require('path')
const file = fs.createWriteStream(path.join(__dirname, process.argv[2] || 'webapp.log'))

for(let i=0; i<= 1e6; i++) {
  file.write('React Quickly: Painless web apps with React, JSX, Redux, and GraphQL.\n')
}

file.end()