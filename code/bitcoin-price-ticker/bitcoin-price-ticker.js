const https = require('https')

const server = require('net').createServer()
let counter = 0
let sockets = {}
const fetchBTCPrice = (currency, socket) => {
  const req = https.request({
    port: 443,
    hostname: 'api.coindesk.com',
    method: 'GET',
    path: `/v1/bpi/currentprice/${currency}.json`
  }, (res) => {
    let data = ''
    res.on('data', (chunk) => {
      data +=chunk
    })
    res.on('end', () => {
      socket.write(`1 BTC is ${JSON.parse(data).bpi[currency].rate} ${currency}\n`)
    })
  })
  req.end()
}
function timestamp() {
  const now = new Date()
  return `${now.getHours()}:${now.getMinutes()}`
}

server.on('connection', socket => {
  socket.id = counter++

  console.log('Welcome to Bitcoin Price Ticker (Data by Coindesk)')
  console.log(`There are ${counter} clients connected`)
  socket.write('Enter currency code (e.g., USD or CNY): ')

  socket.on('data', data => {
    let currency = data.toString().trim()
    if (!sockets[socket.id]) {
      sockets[socket.id] = {
        currency: currency
      }
      console.log(currency)
    }
    fetchBTCPrice(currency, socket)
    clearInterval(sockets[socket.id].interval)
    sockets[socket.id].interval = setInterval(()=>{
      fetchBTCPrice(currency, socket)
    }, 5000)
  })

  socket.on('end', () => {
    delete sockets[socket.id]
    console.log('Client disconnected')
  })
})

server.listen(8000, () => console.log('Server bound'))