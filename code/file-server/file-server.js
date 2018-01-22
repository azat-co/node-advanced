const url = require('url')
const fs = require('fs')
const path = require('path')
const SECRET = process.env.SECRET
const server = require('http').createServer((req, res) => {
  console.log(`URL is ${req.url} and the method is ${req.method}`)
  const course = req.url.match(/courses\/([0-9]*)/) // works for /courses/123 to get 123
  const query = url.parse(req.url, true).query // works for /?key=value&key2=value2
  if (course && course[1] && query.API_KEY === SECRET) {
    fs.readFile(path.join(__dirname, 'clients_credit_card_archive.sql'), (error, data)=>{
      if (error) {
        res.writeHead(500)
        res.end('Server error')
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain' })
        res.end(data)
      }
    })
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
}).listen(3000, () => {
  console.log('server is listening on 3000')
})
