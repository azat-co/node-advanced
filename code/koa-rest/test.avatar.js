const axios = require('axios')
const crypto = require('crypto')
const {expect} = require('chai')
const app = require('./server.js')
const port = 3004

const {promisify} = require('util')
const readFile = promisify(require('fs').readFile)

const AZAT_EMAIL = 'hi@azat.co'
let server 
before(async function() {
  server = await app.listen(port, ()=>{console.log('server is running')})
  console.log('code after the server is running')
})

describe('express rest api server', async () => {

  it('retrieves Azat\'s avatar which is the same as saved image', async () => {
    const {data: image} = await axios.get(`http://localhost:${port}?email=${AZAT_EMAIL}`)
    expect(image).to.eql((await readFile('./azat_avatar.jpeg')).toString())
  })

  it('retrieves Azat\'s avatar which is the same as gravatar image', async () => {    
    await Promise.all([
      axios.get(`http://localhost:${port}?email=${AZAT_EMAIL}`, {responseType: 'arraybuffer'}),
      axios.get(`https://gravatar.com/avatar/${crypto.createHash('md5').update(AZAT_EMAIL).digest('hex')}?size=150`, {responseType: 'arraybuffer'})
    ]).then(images=>{
      // console.log(images[0].data)
      // console.log(images[1].data)
      expect(images[0].data).to.eql(images[1].data)
    })
    // const {data: proxyImage} = await axios.get(`http://localhost:${port}?email=${AZAT_EMAIL}`)
    // const {data: gravatarImage} = await axios.get(`http://gravatar.com/${crypto.createHash('md5').update(AZAT_EMAIL).digest('hex')}`)
  })
})
after(()=> {
  server.close(()=>{
    console.log('all is done, bye')
  })
})