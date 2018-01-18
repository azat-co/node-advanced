const http2 = require('http2')
const fs = require('fs')

const server = http2.createSecureServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain' })
  res.end('<h1>Hello World</h1>') // JUST LIKE HTTP!
})
server.on('error', (err) => console.error(err))
server.listen(3000)