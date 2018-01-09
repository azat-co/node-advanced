const https = require('https') // require('https')

const req = https.request({
    hostname: 'webapplog.com',
    port: 443, // 80
    path: '/',
    method: 'GET'
  }, (res) => {
  console.log('statusCode:', res.statusCode)
  console.log('headers:', res.headers)

  res.on('data', (chunk) => {
    process.stdout.write(Buffer.from(chunk.toString().length.toString()+'\n'))
  })
})

req.on('error', (error) => {
  console.error(error)
})
req.end()