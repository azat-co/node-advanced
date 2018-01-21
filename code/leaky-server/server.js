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
      // ref to tempCryptoWallet ???
      console.log('address returned')
    }
  }
}

app.get('*', (req, res) => {
  generateAddress()
  console.log(process.memoryUsage())
  return res.json({msg: 'ok'})
})
app.listen(3000)