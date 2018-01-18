const path = require('path')
const fileName = path.join(__dirname, process.argv[2] || 'webapp.log')
const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  if (req.url === '/callback') {
    fs.readFile(fileName, (err, data) => {
      if (err) return console.error(err)
      res.end(data)
    })
  } else if (req.url === '/stream') {
    const src = fs.createReadStream(fileName)
    src.pipe(res)
  }
})

server.listen(3000)