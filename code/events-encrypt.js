const events = require('events')
class Encrypt extends events {
  constructor (ops) {
    super(ops)
    this.on('start', () => {
      console.log('beginning A')
    })
    this.on('start', () => {
      console.log('beginning B')
      setTimeout(() => {
        this.emit('finish', {msg: 'ok'})
      }, 0)
    })
  }
}

const encrypt = new Encrypt()
encrypt.on('finish', (data) => {
  console.log(`Finshed with message: ${data.msg}`)
})
encrypt.emit('start')
