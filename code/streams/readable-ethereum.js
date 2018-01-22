const {Readable} = require('stream')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/jrrVdXuXrVpvzsYUkCYq"))

const latestBlock = new Readable({
  read(size) {
    web3.eth.getBlock('latest')
      .then((x) => {
        // console.log(x.timestamp)
        this.push(`${x.hash}\n`)
        // this.push(null)
      })
  }
})

latestBlock.pipe(process.stdout)
