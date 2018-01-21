// const memwatch = require('memwatch-next')


const express = require('express')

const app = express()

let cryptoWallet = {}
const generateAddress = () => {
  const initialCryptoWallet = cryptoWallet
  const tempCryptoWallet = () => {
    if (initialCryptoWallet) console.log('We received initial cryptoWallet')
  }
  cryptoWallet = {
    key: new Array(1e7).join('.'),
    address: () => {
      console.log('address returned')
    }
  }
}
// memwatch.on('leak', function(info) { 
  // setTimeout(function() { 
  // }, 3000)
// })
const heapdump = require('heapdump')
setInterval(function () {
  heapdump.writeSnapshot()
}, 2 * 1000)

app.get('*', (req, res) => {
  // var hd = new memwatch.HeapDiff()
  generateAddress()
  // var diff = hd.end()
  // console.log(JSON.stringify(diff))
  console.log(process.memoryUsage())

  return res.json({msg: 'ok'})
})
app.listen(3000)