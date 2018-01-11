// ```
// node log-files.js
// ```

// ```
// tail -f *.log
// ```

const fs = require('fs')
const path = require('path')
const dirname = path.join(__dirname)

const files = fs.readdirSync(dirname)
const ms1Day = 24 * 60 * 60 * 1000

files.forEach(file => {
  const filePath = path.join(dirname, file)
  fs.stat(filePath, (err, stats) => {
    if (err) throw err

    if ((Date.now() - stats.mtime.getTime() > 7 * ms1Day)) {
      console.log(`Deleting ${filePath} with time ${stats.mtime.toDateString()}`)
      // fs.unlink(filePath, (err) => {
      //   if (err) throw err
      //   console.log(`deleted ${filePath}`)
      // })
    }
  })
})
