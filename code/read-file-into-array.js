const fs = require('fs')

const readFileIntoArray = function (file, cb = null) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        if (cb) return cb(error)
        return reject(error)
      }

      const lines = data.toString().trim().split('\n')
      if (cb) return cb(null, lines)
      else return resolve(lines)
    })
  })
}

const printLines = (lines) => {
  console.log(`there are ${lines.length} line(s)`)
  console.log(lines)
}
const FILE_NAME = __filename
readFileIntoArray(FILE_NAME)
  .then(printLines)
  .catch(console.error)

readFileIntoArray(FILE_NAME, (error, lines) => {
  if (error) return console.error(error)
  printLines(lines)
})
